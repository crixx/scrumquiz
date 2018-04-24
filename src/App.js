import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import QuizzArea from './components/QuizzArea/QuizzArea';

import Notifications from "./components/Notifications/Notifications";
import HighScore from './containers/HighScore/HighScore';

// example of how to lazy load a component from the server
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      // TODO: uncomment to use auth - for demo purpose commented out
      //   <Switch>
      //     <Route path="/auth" component={asyncAuth} />
      //     <Route path="/" exact component={Home} />
      //     <Route path="/fcm" exact component={Notifications} />
      //     <Redirect to="/auth" />
      //   </Switch>
      // );

      // if (this.props.isAuthenticated) {
      //   routes = (
      <Switch>
        <Route path="/psm1" component={QuizzArea} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/fcm" exact component={Notifications} />
        <Route path="/highscore" exact component={HighScore} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
    // }

    return (
      <div>
        <MuiThemeProvider>
          <Layout>
            {routes}
          </Layout>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
