import React from 'react';
import NewFlightButton from './NewFlightButton.js';
import { AirlineIataCode } from '../../Constants.js';
import './NewFlights.css';

class NewFlights extends React.Component {
  render() {
    return (
      <div className="NewFlights">
        {this.props.flights.map((flight, index) => {
            let buttonText = `${AirlineIataCode}${flight.flightNumber} ` +
                `${flight.route.departureAirportCode}-${flight.route.arrivalAirportCode}`;
            return (
              <NewFlightButton
                key={index}
                flightIndex={index}
                buttonText={buttonText}
                createNewFlight={(flightIndex) => this.props.createNewFlight(flightIndex)}
              />
            )
          })}
      </div>
    );
  }
}

export default NewFlights;
