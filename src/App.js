import React, { Component } from 'react';
// import logo from './trivia.png';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact patch="/game" component={ Game } />
      </Switch>
    );
  }
}
