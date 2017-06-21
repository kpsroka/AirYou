import React from 'react';
import ScheduleAirplaneEditor from './ScheduleAirplaneEditor.js';
import ScheduleAirportEditor from './ScheduleAirportEditor.js';
import ScheduleClockTimeEditor from './ScheduleClockTimeEditor.js';
import ScheduleDaysOfWeekEditor from './ScheduleDaysOfWeekEditor.js';
import ScheduleEditorRowComponent from './ScheduleEditorRowComponent.js';
import ScheduleFlightCodeEditor from './ScheduleFlightCodeEditor.js';
import { AirlineIataCode } from '../../Constants.js';
import { AIRPLANES } from '../../model/Airplanes.js';
import './ScheduleEditor.css';
import '../common/ModalWindow.css';

class ScheduleEditor extends React.Component {
  render() {
    let flightCode = `${AirlineIataCode}${this.props.flight.flightNumber}`;
    return (
        <div className="modalWindow scheduleEditor">
          <div className="modalWindowClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
          <div className="modalWindowTitle">AirYou flight {flightCode}</div>
          <ScheduleEditorRowComponent
              label="Flight number"
              flightIndex={this.props.flightIndex}
              path={["flightNumber"]}
              valueRender={(flightNumber) => (`${AirlineIataCode}${flightNumber}`)}
              editComponent={<ScheduleFlightCodeEditor/>}
          />
          <ScheduleEditorRowComponent
              label="From"
              flightIndex={this.props.flightIndex}
              path={["route", "departureAirportCode"]}
              editComponent={<ScheduleAirportEditor/>}
          />
          <ScheduleEditorRowComponent
              label="To"
              flightIndex={this.props.flightIndex}
              path={["route", "arrivalAirportCode"]}
              editComponent={<ScheduleAirportEditor/>}
          />
          <ScheduleEditorRowComponent
              label="Airplane model"
              flightIndex={this.props.flightIndex}
              path={["airplaneIndex"]}
              valueRender={(airplaneIndex) => (
                  `${AIRPLANES[airplaneIndex].manufacturer} ${AIRPLANES[airplaneIndex].model}`)}
              editComponent={<ScheduleAirplaneEditor/>}
              />
          <ScheduleEditorRowComponent
              label="Departure time"
              flightIndex={this.props.flightIndex}
              path={["schedule", "departureTime"]}
              valueRender={(time) => this.formatTime(time)}
              editComponent={<ScheduleClockTimeEditor />}
          />
          <ScheduleEditorRowComponent
              label="Departs on"
              value={this.props.flight.schedule.departureDaysOfWeek}
              valueRender={(input) => (
                  <ScheduleDaysOfWeekEditor initialValue={input} disabled="disabled" />
              )}
          />
        </div>
    )
  }

  formatTime(time) {
    let timeFormatOptions = {hour: "2-digit", minute: "2-digit"};
    return Intl.DateTimeFormat("en-US", timeFormatOptions)
        .format(new Date(2017, 0, 1, time.hours, time.minutes));
  }
}

export default ScheduleEditor;
