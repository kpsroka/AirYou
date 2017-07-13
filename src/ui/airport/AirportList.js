import React from 'react';
import './AirportList.css';
import '../common/ModalWindow.css';

class AirportList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedAirport: null };
  }
  render() {
    return (
        <div className="modalWindow airportListWindow">
          <div className="airportListContainer">
            {this.props.airports.map((airport) => this.renderAirportEntry(airport))}
          </div>
          <div>
            {this.renderAiportDetails()}
          </div>
        </div>
    );
  }

  renderAirportEntry(airport) {
    return (
      <div key={airport.code} className="airportListEntry"
          onClick={() => this.selectAirport(airport.code)}>
        <div className="airportListName">{airport.fullName}</div>
        <div>
          {AirportList.renderAirportRank(airport.size)}
        </div>
      </div>
    );
  }

  selectAirport(airportCode) {
    this.setState({selectedAirport: airportCode});
  }

  static renderAirportRank(airportSize, accumulator="") {
    if (airportSize > 0) {
      return AirportList.renderAirportRank(airportSize - 20, accumulator + "★");
    } else {
      return accumulator;
    }
  }

  renderAiportDetails() {
    if (this.state.selectedAirport !== null) {
      return "Selected Airport: " + this.state.selectedAirport;
    } else {
      return "";
    }
  }
}

export default AirportList;
