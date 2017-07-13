import React from 'react';
import './AirportList.css';
import '../common/ModalWindow.css';

class AirportList extends React.Component {
  render() {
    return (
        <div className="modalWindow">
          <div className="airportListContainer">
            {this.props.airports.map((airport) => AirportList.renderAirportEntry(airport))}
          </div>
        </div>
    );
  }

  static renderAirportEntry(airport) {
    return (
      <div key={airport.code} className="airportListEntry">
        <div className="airportListName">{airport.fullName}</div>
        <div>
          {AirportList.renderAirportRank(airport.size)}
        </div>
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
