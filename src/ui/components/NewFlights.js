import React, { Component } from 'react';
import NewFlightButton from "./NewFlightButton.js";
import "./NewFlights.css";

class FieldOfPlay extends Component {
  render() {
    return (
      <div className="NewFlights">
        {this.props.flights.map((flight) => {
            return (
              <NewFlightButton
                key={flight.flightId}
                flight={flight}
                createNewFlight={() => this.props.createNewFlight(flight)}
              />
            )
          })}
      </div>
    );
  }
}

export default FieldOfPlay;
