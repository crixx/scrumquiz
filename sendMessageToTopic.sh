KEY="KEY"

curl -X POST -H "Authorization: key=${KEY}" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Topic Test",
    "body": "Some new topic test",
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:3000"
  },
  "to": "/topics/test"
}' "https://fcm.googleapis.com/fcm/send"