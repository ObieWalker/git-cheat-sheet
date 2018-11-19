import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history'
import '../styles/App.css';
import LandingPage from './LandingPage';
import Login from './Login';
import RequireAuthentication from '../helpers/RequireAuthentication'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <div className="container">
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route path="/cheats" component={RequireAuthentication(LandingPage)} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
