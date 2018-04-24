DEVICETOKEN="token"
AUTHKEY="key"
TOPIC="topic"

curl -X POST -H "Authorization: key=${AUTHKEY}" -H "Content-Type: application/json"  "https://iid.googleapis.com/iid/v1/${DEVICETOKEN}/rel/topics/${TOPIC}"