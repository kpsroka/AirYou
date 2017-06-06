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
                flight={flight}
                buttonText={buttonText}
                createNewFlight={() => this.props.createNewFlight(flight)}
              />
            )
          })}
      </div>
    );
  }
}

export default FieldOfPlay;
