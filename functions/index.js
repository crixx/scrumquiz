const functions = require('firebase-functions');
const request = require('superagent');
const https = require('https');
const keepAliveAgent = new https.Agent({ keepAlive: true });

const admin = require('firebase-admin');
admin.initializeApp();

// Config looks something like this: 
//{
//     "scrumquizz": {
//         "key": "some_fcm_server_key"
//     }
// }
const APP_CONFIG = functions.config().scrumquizz;
//TODO: pass also the app name and the urls as config. And what about the headers?
const headers = {
    "Authorization": "key=" + APP_CONFIG.key,
    "Content-Type": "application/json"
}

const defaultNotification = {
    "notification": {
        "title": "Welcome to our QuizzApp",
        "body": "Checkout our latest Quiz!",
        "click_action": "https://scrumquizz.firebaseapp.com/psm1"
    },
    "to": "/topics/general"
}

const createNotification = ({ title, body, clickAction, recipient }) => {
    const message = {
        "notification": {
            "title": title,
            "body": body,
            "click_action": clickAction
        },
        "to": recipient
    }
    console.log("Message to send: " + JSON.stringify(message));

    return JSON.stringify(message);
};

//TODO: instead of this post request check the firebase provided messageing library for fcm
const sendNotification = (message) => {
    return request
        .post("https://fcm.googleapis.com/fcm/send")
        .set(headers)
        .send(message);
}

const checkUserRoles = (userGroup, uid) => {
    //TODO: check what is wrong here
    console.log("checking user:" + uid);
    // Get the list of roles of the user
    return admin.database()
        .ref(`/roles/${userGroup}`).once('value').then((users) => {
            console.log(users.includes(uid))
            return users.includes(uid);
        }).catch(reason => console.log(reason));
}


exports.subscribeTokenToTopic = functions.https.onRequest((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.status(200).end();
    }
    if (req.body.token === undefined) {
        // This is an error case, as "token" is required
        console.log("No token defined.")
        return res.status(400).send('No token defined!');
    } else if (req.body.topic === undefined) {
        // This is an error case, as "topic" is required
        console.log("No topic defined.")
        return res.status(400).send('No topic defined!');
    }
    return request
        .post("https://iid.googleapis.com/iid/v1/" + req.body.token + "/rel/topics/" + req.body.topic)
        .set(headers)
        .send({})
        .end((err, response) => {
            if (err) {
                console.log(err)
                res.status(err.status).send(response.body);
            } else {
                console.log(response.body)
                console.log("registration ok, sending message...")
                sendNotification(defaultNotification).then((resp) => {
                    console.log("message sent");
                    return res.status(200).send(resp.body);
                }).catch((reason) => {
                    console.log("message sending error");
                    return res.status(400).send(reason);
                })
            }
        });
});


exports.sendMessageToTopic = functions.https.onRequest((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Headers", "*");
        return res.status(200).end();
    }
    if (req.body.title && req.body.body && req.body.clickAction && req.body.recipient && req.body.uid) {
        //TODO: enable some kind of authentication check

        //return checkUserRoles("admins", req.body.uid).then((isAllowed) => {
        // if (!isAllowed) {
        //     throw new Error("User is not allowed to send messages")
        // }
        console.log("[sendMessageToTopic] checks passed: sending notification")
        // return sendNotification(createNotification(title, body, clickAction, recipient))
        return sendNotification(createNotification(req.body)).then(resp => {
            console.log("[sendMessageToTopic] message sent");
            return res.status(200).send(resp.body);
        })
            .catch(reason => {
                console.log("[sendMessageToTopic] an error occured: " + reason);
                return res.status(400).send(reason)
            });
    } else {
        console.log("[sendMessageToTopic] bad request:" + request)
        return res.status(400).send("[sendMessageToTopic] Bad Request:" + req.body);
    }
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });