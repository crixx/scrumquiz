import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// TODO: notification stuff should be put somewhere else!
import FirebaseMessaging from "../../FirebaseMessaging"
import axios from "axios"
import { Snackbar } from 'material-ui';


class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false,
            token: '',
            toast: false,
            toastMessage: '',
            notificationsAllowed: false
        }

        this.message = new FirebaseMessaging({
            handleMessage: this.handleMessage.bind(this)
        });
    }

    componentDidMount() {
        if (!localStorage.getItem("fcmtoken")) {
            this.message.requestPermission().then(token => {
                console.log(token);
                localStorage.setItem("fcmtoken", token);
                axios.post('https://us-central1-scrumquizz.cloudfunctions.net/subscribeTokenToTopic', { "token": token, "topic": "general" }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(function (response) {
                        console.info("registration ok");
                    })
                this.setState({
                    ...this.state,
                    token: token,
                    notificationsAllowed: true
                })
            })
                .catch(function (error) {
                    console.error("registration failed");
                    console.log(error);
                });
        }
    }

    handleMessage = ({ notification: { title = 'Title', body = 'Body' } = {} }) => {
        console.log("message handeled")
        this.setState({
            toast: true,
            toastMessage: `${title}: ${body}`
        });
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <Snackbar
                    open={this.state.toast}
                    message={this.state.toastMessage}
                    autoHideDuration={8000}
                    onRequestClose={() => this.setState({ toast: false })}
                />
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);