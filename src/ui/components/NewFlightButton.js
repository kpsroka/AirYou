import React, { Component } from 'react';
import "./NewFlightButton.css";

class NewFlightButton extends Component {
  render() {
    return (
      <button className="newFlightButton" onClick={() => this.props.createNewFlight(this.props.flight)}>
        {this.props.flight.airlineIataCode}{this.props.flight.flightNumber} {this.props.flight.departureAirportCode}-{this.props.flight.arrivalAirportCode}
      </button>
    )
  }
}

export default NewFlightButton;
