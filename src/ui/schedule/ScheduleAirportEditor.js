import React from 'react';
import { AIRPORTS } from '../../model/Airports.js';

class ScheduleAirportEditor extends React.Component {
  render() {
    return (
        <select
            defaultValue={this.props.initialValue}
            onChange={(inputEvent) => this.props.onInputChange(inputEvent.target.value)}>
          {AIRPORTS.map(airport => (
              <option key={airport.code} value={airport.code}>
                {airport.code}
              </option>
          ))}
        </select>
    )
  }
}

export default ScheduleAirportEditor;
