import React, { Component } from 'react';
import Airport from "./Airport.js";
import "./FieldOfPlay.css";

class FieldOfPlay extends Component {
  render() {
    return (
      <div className="FieldOfPlay">
        Field of Play
        <Airport code="SFO" icon="○" position={{x: 5, y: 35}}/>
        <Airport code="MCI" icon="○" position={{x: 45, y: 33}}/>
        <Airport code="ATL" icon="○" position={{x: 88, y: 19}}/>
        <Airport code="JFK" icon="○" position={{x: 92, y: 66}}/>
      </div>
    );
  }
}

export default FieldOfPlay;
