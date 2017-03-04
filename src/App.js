import React, { Component } from 'react';
import Clock from './ui/components/Clock.js';
import FieldOfPlay from './ui/components/FieldOfPlay.js';

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock />
        <FieldOfPlay />
      </div>
    );
  }
}

export default App;
