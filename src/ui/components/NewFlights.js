import React from 'react';
import NewFlightButton from './NewFlightButton.js';
import './NewFlights.css';

class NewFlights extends React.Component {
  render() {
    return (
      <div className="NewFlights">
        {this.props.flights.map((flight, index) => {
            let buttonText = `${flight.flightCode} ` +
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
