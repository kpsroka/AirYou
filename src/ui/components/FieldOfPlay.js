import React, { Component } from 'react';
import Airport from "./Airport.js";
import "./FieldOfPlay.css";

class FieldOfPlay extends Component {
  render() {
    return (
      <div className="FieldOfPlay">
        Field of Play
        {this.props.airports.map((airport) => (
          <Airport
            key={airport.code}
            code={airport.code}
            icon="○"
            position={airport.position} />
        ))}
      </div>
    );
  }
}

export default FieldOfPlay;
