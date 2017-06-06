import React, { Component } from 'react';
import NewFlightButton from "./NewFlightButton.js";
import "./NewFlights.css";

class FieldOfPlay extends Component {
  render() {
    return (
      <div className="NewFlights">
        {this.props.flights.map((flight) => {
            let buttonText = `${flight.flightId} ${flight.departureAirportCode}-${flight.arrivalAirportCode}`;
            return (
              <NewFlightButton
                key={flight.flightId}
                flightCode={flight.flightId}
                buttonText={buttonText}
                createNewFlight={(flightCode) => this.props.createNewFlight(flightCode)}
              />
            )
          })}
      </div>
    );
  }
}

export default FieldOfPlay;
