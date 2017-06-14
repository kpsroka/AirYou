import React from 'react';
import ClockComponent from './ui/clock/ClockComponent.js';
import FieldOfPlayComponent from './ui/field/FieldOfPlayComponent.js';
import NewFlightsComponent from './ui/components/NewFlightsComponent.js';
import ScheduleListComponent from './ui/schedule/ScheduleListComponent.js';

import './App.css'

class App extends React.Component {
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
