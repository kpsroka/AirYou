import React, { Component } from 'react';
import "./Airport.css";
import BgImage from "../../../public/airport.svg";


class Airport extends Component {
  positionToStyle(position) {
    return {
      bottom: position.y + "%",
      left: position.x + "%"
    };
  }

  render() {
    return (
      <div className="airport" style={this.positionToStyle(this.props.position)}>
        <img className="airportIcon" src={BgImage} role="presentation" />
        <div className="airportName">{this.props.code}</div>
      </div>
    )
  }
}

export default Airport;
