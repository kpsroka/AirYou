import React, { Component } from 'react';
import ClockComponent from './ui/components/ClockComponent.js';
import FieldOfPlayComponent from './ui/components/FieldOfPlayComponent.js';
import NewFlightsComponent from './ui/components/NewFlightsComponent.js';
import ScheduleListComponent from './ui/components/ScheduleListComponent.js';

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <FieldOfPlayComponent />
        <ClockComponent />
        <NewFlightsComponent />
        <ScheduleListComponent />
      </div>
    );
  }
}

export default App;
