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
  saveInputByPath(path, value) {
    this.props.integrateSchedule(this.props.flightIndex, path, value);
  }

  render() {
    let saveInputByPath = this.saveInputByPath.bind(this);
    return (
        <div className="modalWindow scheduleEditor">
          <div className="modalWindowClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
          <div className="modalWindowTitle">{this.props.title}</div>
          <ScheduleEditorRowComponent
              label="Flight number"
              flightIndex={this.props.flightIndex}
              path={["flightNumber"]}
              valueRender={(flightNumber) => (`${AirlineIataCode}${flightNumber}`)}
              editComponent={<ScheduleFlightCodeEditor/>}
              onSave={saveInputByPath}
          />
          <ScheduleEditorRowComponent
              label="From"
              flightIndex={this.props.flightIndex}
              path={["route", "departureAirportCode"]}
              editComponent={<ScheduleAirportEditor/>}
              onSave={saveInputByPath}
          />
          <ScheduleEditorRowComponent
              label="To"
              flightIndex={this.props.flightIndex}
              path={["route", "arrivalAirportCode"]}
              editComponent={<ScheduleAirportEditor/>}
              onSave={saveInputByPath}
          />
          <ScheduleEditorRowComponent
              label="Airplane model"
              flightIndex={this.props.flightIndex}
              path={["airplaneIndex"]}
              valueRender={(airplaneIndex) => (
                  `${AIRPLANES[airplaneIndex].manufacturer} ${AIRPLANES[airplaneIndex].model}`)}
              editComponent={<ScheduleAirplaneEditor/>}
              onSave={saveInputByPath}
              />
          <ScheduleEditorRowComponent
              label="Departure time"
              flightIndex={this.props.flightIndex}
              path={["schedule", "departureTime"]}
              valueRender={(time) => this.formatTime(time)}
              editComponent={<ScheduleClockTimeEditor />}
              onSave={saveInputByPath}
          />
          <ScheduleEditorRowComponent
              label="Departs on"
              flightIndex={this.props.flightIndex}
              path={["schedule", "departureDaysOfWeek"]}
              valueRender={(input) => (
                  <ScheduleDaysOfWeekEditor initialValue={input} disabled="disabled" />
              )}
              editComponent={<ScheduleDaysOfWeekEditor />}
              onSave={saveInputByPath}
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
