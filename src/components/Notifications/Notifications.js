import React from 'react';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { TextField, RaisedButton } from 'material-ui';
import axios from "axios"
import CardActions from 'material-ui/Card/CardActions';

class Notification extends React.Component {
    state = {
        title: "",
        body: "",
        recipient: "",
        clickAction: ""
    };

    handleTitleChange = (event) => {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    }
    handleBodyChange = (event) => {
        this.setState({
            ...this.state,
            body: event.target.value
        });
    }


    handleRecipientChange = (event) => {
        this.setState({
            ...this.state,
            recipient: event.target.value
        });
    }
    handleClickActionChange = (event) => {
        this.setState({
            ...this.state,
            clickAction: event.target.value
        });
    }

    handleSubmitClick = (event) => {
        axios.post('https://us-central1-scrumquizz.cloudfunctions.net/sendMessageToTopic', { "title": this.state.title, "body": this.state.body, "recipient": this.state.recipient, "clickAction": this.state.clickAction, "uid": localStorage.getItem("userId") }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                console.info("sendmessage ok");
                console.log(response)
            })
            .catch(function (error) {
                console.error("registration failed");
            });
    }

    render() {
        return (
            <div>
                <Card style={{ margin: "1em" }}>
                    <CardTitle title="Web Push Token" subtitle="Here is the token for your device. The token is used to send push-notifications to your PWA. Currently, this feature is only available for not Apple devices." />
                    <CardText>
                        <TextField
                            floatingLabelText="Token"
                            disabled={true}
                            fullWidth={true}
                            multiLine={true}
                            rows={2}
                            value={localStorage.getItem("fcmtoken")}
                        />
                    </CardText>
                </Card>

                <Card style={{ margin: "1em" }}>
                    <CardTitle title="Write Push Message" subtitle="Here is a text field to easily write messages to topics." />
                    <CardText>
                        <TextField
                            id="title"
                            hintText="Title"
                            fullWidth={true}
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                        />
                        <TextField
                            id="body"
                            fullWidth={true}
                            hintText="Message Body"
                            value={this.state.body}
                            onChange={this.handleBodyChange}
                        />

                        <TextField
                            id="clickAction"
                            fullWidth={true}
                            hintText="www.domain.com/whatToDoOnClickOnNotification"
                            value={this.state.clickAction}
                            onChange={this.handleClickActionChange}
                        />

                        <TextField
                            id="recipient"
                            hintText="your token"
                            fullWidth={true}
                            value={this.state.recipient}
                            onChange={this.handleRecipientChange}
                        />

                    </CardText>
                    <CardActions>
                        <RaisedButton label="Primary" primary={true} onClick={this.handleSubmitClick} />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Notification;