import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history'
import '../styles/App.css';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import RequireAuthentication from '../helpers/RequireAuthentication'
import NotFound from './NotFound'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="container">
          <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route path="/cheats" component={RequireAuthentication(LandingPage)} />
              <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
