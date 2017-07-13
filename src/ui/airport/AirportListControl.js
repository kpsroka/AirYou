import React from 'react';
import AirportListComponent from './AirportListComponent.js';
import './AirportListControl.css';

class AirportListControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { airportListVisible: false };
  }

  render() {
    if (this.state.airportListVisible) {
      return (
          <div className="airportListWrapper">
            {this.renderInnerContent(true)}
          </div>
      );
    } else {
      return this.renderInnerContent(false);
    }
  }

  renderInnerContent(renderAirportList) {
    return (
        <div className="airportListControl">
          <button
              className="flightsListToggleButton"
              onClick={() => this.toggleAirportsList()}>
            Airports
          </button>
          {AirportListControl.maybeRenderAirportList(renderAirportList)}
        </div>
    );
  }

  toggleAirportsList() {
    this.setState((prevState) => ({ airportListVisible: !prevState.airportListVisible }));
  }

  static maybeRenderAirportList(renderAirportList) {
    if (renderAirportList) {
      return <AirportListComponent />
    } else {
      return "";
    }
  }
}

export default AirportListControl;
