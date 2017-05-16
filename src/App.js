import React, { Component } from 'react';
import ClockComponent from './ui/components/ClockComponent.js';
import FieldOfPlayComponent from './ui/components/FieldOfPlayComponent.js';
import NewFlightsComponent from './ui/components/NewFlightsComponent.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FieldOfPlayComponent />
        <ClockComponent />
        <NewFlightsComponent />
      </div>
    );
  }
}

export default App;
