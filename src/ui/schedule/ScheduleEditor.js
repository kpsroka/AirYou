import React from 'react';
import ScheduleAirplaneEditor from './ScheduleAirplaneEditor.js';
import ScheduleAirportEditor from './ScheduleAirportEditor.js';
import ScheduleClockTimeEditor from './ScheduleClockTimeEditor.js';
import ScheduleDaysOfWeekEditor from './ScheduleDaysOfWeekEditor.js';
import ScheduleEditorRowComponent from './ScheduleEditorRowComponent.js';
import ScheduleFlightCodeEditor from './ScheduleFlightCodeEditor.js';
import { formatTime } from '../common/DateTimeFormatter.js';
import { AirlineIataCode } from '../../Constants.js';
import Objects from '../../aux/Objects.js'
import { AIRPLANES } from '../../model/Airplanes.js';
import './ScheduleEditor.css';
import '../common/ModalWindow.css';

class ScheduleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: props.flight };
  }

  saveInputByPath(path, value) {
    this.setState((prevState) => ({
      input: Objects.updateObject(prevState.input, path, value)
    }));
    if (!this.props.batchMode) {
      this.props.integrateSchedule(this.props.flightIndex, path, value);
    }
  }

  render() {
    let saveInputByPath = this.saveInputByPath.bind(this);
    return (
        <div className="modalWindow scheduleEditor">
          <div className="modalWindowClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
          <div className="modalWindowTitle">{this.props.title}</div>
          <ScheduleEditorRowComponent
              label="Flight number"
              flight={this.state.input}
              path={["flightNumber"]}
              valueRender={(flightNumber) => (`${AirlineIataCode}${flightNumber}`)}
              editComponent={<ScheduleFlightCodeEditor/>}
              onSave={saveInputByPath}
          />
          <ScheduleEditorRowComponent
              label="From"
              flight={this.state.input}
              path={["route", "departureAirportCode"]}
              editComponent={<ScheduleAirportEditor/>}
              onSave={saveInputByPath}
          />
          <ScheduleEditorRowComponent
              label="To"
              flight={this.state.input}
              path={["route", "arrivalAirportCode"]}
              editComponent={<ScheduleAirportEditor/>}
              onSave={saveInputByPath}
          />
          <ScheduleEditorRowComponent
              label="Airplane model"
              flight={this.state.input}
              path={["airplaneIndex"]}
              valueRender={(airplaneIndex) => (
                  `${AIRPLANES[airplaneIndex].manufacturer} ${AIRPLANES[airplaneIndex].model}`)}
              editComponent={<ScheduleAirplaneEditor/>}
              onSave={saveInputByPath}
              />
          <ScheduleEditorRowComponent
              label="Departure time"
              flight={this.state.input}
              path={["schedule", "departureTime"]}
              valueRender={(time) => formatTime(new Date(2017, 0, 1, time.hours, time.minutes))}
              editComponent={<ScheduleClockTimeEditor />}
              onSave={saveInputByPath}
          />
          <ScheduleEditorRowComponent
              label="Departs on"
              flight={this.state.input}
              path={["schedule", "departureDaysOfWeek"]}
              valueRender={(input) => (
                  <ScheduleDaysOfWeekEditor initialValue={input} disabled="disabled" />
              )}
              editComponent={<ScheduleDaysOfWeekEditor />}
              onSave={saveInputByPath}
          />
          {this.renderBatchModeElement()}
        </div>
    )
  }

  renderBatchModeElement() {
    if (this.props.batchMode) {
      return (
          <div className="clickableText"
               onClick={() => {
                 this.props.addSchedule(this.state.input);
                 this.props.onCloseWindowRequest();
               }}>
            Save schedule
          </div>
      );
    } else {
      return "";
    }
  }
}

export default ScheduleEditor;
