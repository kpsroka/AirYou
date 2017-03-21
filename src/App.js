import React, { Component } from 'react';
import ClockComponent from './ui/components/ClockComponent.js';
import FieldOfPlay from './ui/components/FieldOfPlay.js';

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <ClockComponent />
        <FieldOfPlay />
      </div>
    );
  }
}

export default App;
