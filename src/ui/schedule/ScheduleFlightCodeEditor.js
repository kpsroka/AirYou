import React from 'react';
import './ScheduleFlightCodeEditor.css';

class ScheduleFlightCodeEditor extends React.Component {
  render() {
    return (
        <div>
          <span>{this.props.airlineIataCode}</span>
          <input className="flightNumberInput"
                 id="flightNumber"
                 type="number"
                 autoComplete="off"
                 defaultValue={this.props.initialValue}
          />
        </div>
    )
  }
}

export default ScheduleFlightCodeEditor;
