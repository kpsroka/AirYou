import React, { Component } from 'react';
import "./Airport.css";

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
        <div>{this.props.icon}</div>
        <div className="airportName">{this.props.code}</div>
      </div>
    )
  }
}

export default Airport;
