import React from 'react';
import { AIRPLANES } from '../../model/Airplanes.js';

class FlightAirplaneEditor extends React.Component {
  render() {
    return (
        <select
            defaultValue={this.props.initialValue}
            onChange={(inputEvent) => this.props.onInputChange(inputEvent.target.value)}>
          {AIRPLANES.map((airplane, index) => (
              <option key={index} value={index}>
                {airplane.manufacturer} {airplane.model}
              </option>
          ))}
        </select>
    )
  }
}

export default FlightAirplaneEditor;
