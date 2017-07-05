import React from 'react';
import ScheduleList from './ScheduleList.js';
import ScheduleEditorComponent from './ScheduleEditorComponent.js';
import ScheduleEditorRow from './ScheduleEditorRow.js';
import ScheduleAirplaneEditor from './ScheduleAirplaneEditor.js';
import ScheduleAirportEditor from './ScheduleAirportEditor.js';
import ScheduleClockTimeEditor from './ScheduleClockTimeEditor.js';
import ScheduleDaysOfWeekEditor from './ScheduleDaysOfWeekEditor.js';
import ScheduleFlightCodeEditor from './ScheduleFlightCodeEditor.js';
import { formatTime } from '../common/DateTimeFormatter.js';
import { AirlineIataCode } from '../../Constants.js';
import { AIRPLANES } from '../../model/Airplanes.js';

import './ScheduleListControl.css';

class ScheduleListControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {scheduleListVisible: false, editedFlightIndex: null};
  }

  render() {
    if (this.state.scheduleListVisible) {
      return (
          <div className="scheduleListWrapper">
            {this.renderInnerContent(true)}
          </div>
      );
    } else {
      return this.renderInnerContent(false);
    }
  }

  renderInnerContent(renderScheduleList) {
    return (
        <div className="scheduleListControl">
          <button
              className="scheduleListToggleButton"
              onClick={() => {this.toggleScheduleList()}}>
            Schedules
          </button>
          {this.maybeRenderScheduleList(renderScheduleList)}
          {this.maybeRenderScheduleEditor()}
        </div>
    )
  }

  maybeRenderScheduleList(renderScheduleList=false) {
    if (renderScheduleList) {
      return (
            <ScheduleList
                flights={this.props.flights}
                onAddSchedule={() => this.onAddSchedule()}
                onDeleteSchedule={this.props.deleteSchedule}
                onEditSchedule={(flightIndex) => this.editSchedule(flightIndex)}
                onCloseWindowRequest={() => this.toggleScheduleList()}
            />
      )
    } else {
      return "";
    }
  }

  maybeRenderScheduleEditor() {
    if (this.state.editedFlightIndex !== null &&
        this.props.flights[this.state.editedFlightIndex]) {
      const flight = this.props.flights[this.state.editedFlightIndex];
      const flightCode = `${AirlineIataCode}${flight.flightNumber}`;
      return (
          <ScheduleEditorComponent
              flight={flight}
              title={`AirYou flight ${flightCode}`}
              flightIndex={this.state.editedFlightIndex}
              onCloseWindowRequest={() => this.editSchedule(null)}>
            <ScheduleEditorRow
                label="Flight number"
                path={["flightNumber"]}
                valueRender={(flightNumber) => (`${AirlineIataCode}${flightNumber}`)}
                editComponent={<ScheduleFlightCodeEditor/>}
            />
            <ScheduleEditorRow
                label="From"
                path={["route", "departureAirportCode"]}
                editComponent={<ScheduleAirportEditor/>}
            />
            <ScheduleEditorRow
                label="To"
                path={["route", "arrivalAirportCode"]}
                editComponent={<ScheduleAirportEditor/>}
            />
            <ScheduleEditorRow
                label="Airplane model"
                path={["airplaneIndex"]}
                valueRender={(airplaneIndex) => (
                    `${AIRPLANES[airplaneIndex].manufacturer} ${AIRPLANES[airplaneIndex].model}`)}
                editComponent={<ScheduleAirplaneEditor/>}
            />
            <ScheduleEditorRow
                label="Departure time"
                path={["schedule", "departureTime"]}
                valueRender={(time) => formatTime(new Date(2017, 0, 1, time.hours, time.minutes))}
                editComponent={<ScheduleClockTimeEditor />}
            />
            <ScheduleEditorRow
                label="Departs on"
                path={["schedule", "departureDaysOfWeek"]}
                valueRender={(input) => (
                    <ScheduleDaysOfWeekEditor initialValue={input} disabled="disabled" />
                )}
                editComponent={<ScheduleDaysOfWeekEditor />}
            />
          </ScheduleEditorComponent>
      )
    } else {
      return "";
    }
  }

  onAddSchedule() {
    this.props.addSchedule();
  }

  editSchedule(flightIndex) {
    this.setState({editedFlightIndex: flightIndex});
  }

  toggleScheduleList() {
    this.setState((prevState) => ({
      scheduleListVisible: !prevState.scheduleListVisible,
      editedFlightIndex: null
    }));
  }
}

export default ScheduleListControl;
