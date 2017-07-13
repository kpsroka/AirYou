import React from 'react';
import '../common/ModalWindow.css';

class AirportList extends React.Component {
  render() {
    return (
        <div className="modalWindow">
          {this.props.airports.map((airport) => AirportList.renderAirportEntry(airport))}
        </div>
    );
  }

  static renderAirportEntry(airport) {
    return (
      <div key={airport.code}>
        <div>{airport.fullName}</div>
        <span>
          {AirportList.renderAirportRank(airport.size)}
        </span>
      </div>
    );
  }

  static renderAirportRank(airportSize, accumulator="") {
    if (airportSize > 0) {
      return AirportList.renderAirportRank(airportSize - 20, accumulator + "★");
    } else {
      return accumulator;
    }
  }
}

export default AirportList;
