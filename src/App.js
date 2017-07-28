import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageList from './messages/MessageList.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Development Skill Test</h2>
        </div>
        <MessageList url="https://andre-campos-test.herokuapp.com"/>
      </div>
    );
  }
}

export default App;
