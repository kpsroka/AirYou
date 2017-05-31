import React, { Component } from 'react';
import AirplaneInFlight from "./AirplaneInFlight.js";
import Airport from "./Airport.js";
import "./FieldOfPlay.css";
import BgImage from "../../../public/US.svg";

class FieldOfPlay extends Component {
  render() {
    return (
      <div className="FieldOfPlay">
        <img className="BackgroundImage" src={BgImage} role="presentation" />
        {this.props.airports.map((airport) => (
          <Airport
            key={airport.code}
            code={airport.code}
            position={airport.position} />
        ))}
        {this.props.airplanesInFlight.map((airplane) => {
          let airplaneKey = `${airplane.flight.airlineIataCode}${airplane.flight.flightNumber}`;
          return <AirplaneInFlight
            key={airplaneKey}
            flightId={airplaneKey}
            departurePosition={this.findAirportPosition(airplane.flight.departureAirportCode)}
            arrivalPosition={this.findAirportPosition(airplane.flight.arrivalAirportCode)}
            flightProgressPct={this.calculateFlightProgress(airplane.flight.distanceKm, airplane.distanceRemainingM)}
          />
        })}
      </div>
    );
  }

  findAirportPosition(departureAirportCode) {
    return this.props.airports.find((airport) => airport.code === departureAirportCode).position;
  }

  calculateFlightProgress(distanceKm, distanceRemainingM) {
    return 100 - (100 * ((distanceRemainingM) / (distanceKm * 1000)));
  }
}

export default FieldOfPlay;
