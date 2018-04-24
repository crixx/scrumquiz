import firebase from 'firebase';

//TODO this file is a pretty hack and should be refactored to use a service like configuration of the instance instead
class FirebaseMessaging {
    webkey = "BGFX8aoknuSVny7q43sao08BF8EKiEddzq0QRGAE-vvjSr05w6BIwTgsmd_AlWDo9xiBUgc6ouI7e0D7EStFn6c"
    defaultConfig = {
        apiKey: "AIzaSyAouWKsjTG5EYw4LXXOX6K0ZC6S14Yd9PE",
        authDomain: "scrumquizz.firebaseapp.com",
        databaseURL: "https://scrumquizz.firebaseio.com",
        projectId: "scrumquizz",
        storageBucket: "scrumquizz.appspot.com",
        messagingSenderId: "389679769205"
    };

    constructor(config = {}) {
        config = Object.assign({
            handleMessage: () => { }
        }, config, this.defaultConfig);

        if (!FirebaseMessaging.defaultApp) {
            FirebaseMessaging.defaultApp = firebase.initializeApp(config);
        }
        this.handleMessage = config.handleMessage;
    }

    requestPermission() {
        const messaging = firebase.messaging();
        messaging.usePublicVapidKey(this.webkey);



        if (this.handleMessage) {
            messaging.onMessage(this.handleMessage);
        }

        return messaging.requestPermission().then(() => {
            console.log('Notification permission granted.');
            return messaging.getToken();
        });
    }


}

FirebaseMessaging.defaultApp = undefined;

export default FirebaseMessaging;