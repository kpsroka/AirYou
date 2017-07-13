import React from 'react';
import AirportListControl from './ui/airport/AirportListControl.js';
import ClockComponent from './ui/clock/ClockComponent.js';
import FieldOfPlayComponent from './ui/field/FieldOfPlayComponent.js';
import NewFlightsComponent from './ui/components/NewFlightsComponent.js';
import FlightsListComponent from './ui/flights/FlightsListComponent.js';
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <FieldOfPlayComponent />
        <ClockComponent />
        <NewFlightsComponent />
        <AirportListControl />
        <FlightsListComponent />
      </div>
    );
  }
}

export default App;
