import React, { Component } from 'react';
// import logo from './trivia.png';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}
