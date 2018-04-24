curl -X POST -H "Authorization: key=KEY" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Again",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:3000"
  },
  "to": "TOKEN"
}' "https://fcm.googleapis.com/fcm/send"