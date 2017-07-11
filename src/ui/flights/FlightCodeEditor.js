import React from 'react';
import './FlightCodeEditor.css';
import { AirlineIataCode } from '../../Constants.js';

class FlightCodeEditor extends React.Component {
  render() {
    return (
        <div>
          <span>{AirlineIataCode}</span>
          <input className="flightNumberInput"
                 id="flightNumber"
                 type="number"
                 autoComplete="off"
                 defaultValue={this.props.initialValue}
                 onInput={(inputEvent) => {this.props.onInputChange(inputEvent.target.value)}}
          />
        </div>
    )
  }
}

export default FlightCodeEditor;
