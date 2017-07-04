import React from 'react';
import ScheduleList from './ScheduleList.js';
import ScheduleEditorComponent from './ScheduleEditorComponent.js';
import './ScheduleListControl.css';
import ScheduleAirplaneEditor from './ScheduleAirplaneEditor.js';
import ScheduleAirportEditor from './ScheduleAirportEditor.js';
import ScheduleClockTimeEditor from './ScheduleClockTimeEditor.js';
import ScheduleDaysOfWeekEditor from './ScheduleDaysOfWeekEditor.js';
import ScheduleEditorRowComponent from './ScheduleEditorRowComponent.js';
import ScheduleFlightCodeEditor from './ScheduleFlightCodeEditor.js';
import { formatTime } from '../common/DateTimeFormatter.js';
import { AirlineIataCode } from '../../Constants.js';
import { AIRPLANES } from '../../model/Airplanes.js';

class ScheduleListControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {scheduleListVisible: false, flightUnderEdition: null};
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
                onAddSchedule={this.props.addSchedule}
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
    if (this.state.flightUnderEdition !== null &&
        this.props.flights[this.state.flightUnderEdition]) {
      const flight = this.props.flights[this.state.flightUnderEdition];
      const flightCode = `${AirlineIataCode}${flight.flightNumber}`;
      return (
          <ScheduleEditorComponent
              flight={flight}
              title={`AirYou flight ${flightCode}`}
              flightIndex={this.state.flightUnderEdition}
              onCloseWindowRequest={() => this.editSchedule(null)}>
            <ScheduleEditorRowComponent
                label="Flight number"
                path={["flightNumber"]}
                valueRender={(flightNumber) => (`${AirlineIataCode}${flightNumber}`)}
                editComponent={<ScheduleFlightCodeEditor/>}
            />
            <ScheduleEditorRowComponent
                label="From"
                path={["route", "departureAirportCode"]}
                editComponent={<ScheduleAirportEditor/>}
            />
            <ScheduleEditorRowComponent
                label="To"
                path={["route", "arrivalAirportCode"]}
                editComponent={<ScheduleAirportEditor/>}
            />
            <ScheduleEditorRowComponent
                label="Airplane model"
                path={["airplaneIndex"]}
                valueRender={(airplaneIndex) => (
                    `${AIRPLANES[airplaneIndex].manufacturer} ${AIRPLANES[airplaneIndex].model}`)}
                editComponent={<ScheduleAirplaneEditor/>}
            />
            <ScheduleEditorRowComponent
                label="Departure time"
                path={["schedule", "departureTime"]}
                valueRender={(time) => formatTime(new Date(2017, 0, 1, time.hours, time.minutes))}
                editComponent={<ScheduleClockTimeEditor />}
            />
            <ScheduleEditorRowComponent
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

  editSchedule(flightIndex) {
    this.setState({flightUnderEdition: flightIndex});
  }

  toggleScheduleList() {
    this.setState((prevState) => ({
      scheduleListVisible: !prevState.scheduleListVisible,
      flightUnderEdition: null
    }));
  }
}

export default ScheduleListControl;
