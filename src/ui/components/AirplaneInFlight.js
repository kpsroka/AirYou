import React, { Component } from 'react';
import "./AirplaneInFlight.css";

class AirplaneInFlight extends Component {
  positionToXYCoords(departurePosition, arrivalPosition, flightProgressPct) {
    let x = departurePosition.x + (arrivalPosition.x - departurePosition.x) * (flightProgressPct / 100);
    let y = departurePosition.y + (arrivalPosition.y - departurePosition.y) * (flightProgressPct / 100);
    return {
      bottom: y + "%",
      left: x + "%"
    };
  }

  positionToRotation(departurePosition, arrivalPosition) {
    let tan =
      -1 * Math.atan2(arrivalPosition.y - departurePosition.y, arrivalPosition.x - departurePosition.x) * 180 / Math.PI;
    return {
      transform: `rotate(${tan}deg)`
    }
  }

  render() {
    return (
      <div className="airplaneInFlight"
           style={this.positionToXYCoords(this.props.departurePosition, this.props.arrivalPosition, this.props.flightProgressPct)}>
        <div style={this.positionToRotation(this.props.departurePosition, this.props.arrivalPosition)}>▻</div>
        <div className="flightId">{this.props.flightId}</div>
      </div>
    )
  }
}

export default AirplaneInFlight;
