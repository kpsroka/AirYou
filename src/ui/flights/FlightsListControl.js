import React from 'react';
import FlightEditorComponent from './FlightEditorComponent.js';
import FlightEditorRow from './FlightEditorRow.js';
import FlightAirplaneEditor from './FlightAirplaneEditor.js';
import FlightAirportEditor from './FlightAirportEditor.js';
import FlightScheduleClockTimeEditor from './FlightScheduleClockTimeEditor.js';
import FlightScheduleDaysOfWeekEditor from './FlightScheduleDaysOfWeekEditor.js';
import FlightCodeEditor from './FlightCodeEditor.js';
import FlightsList from './FlightsList.js';
import { formatTime } from '../common/DateTimeFormatter.js';
import { AirlineIataCode } from '../../Constants.js';
import { AIRPLANES } from '../../model/Airplanes.js';
import { AIRPORTS } from "../../model/Airports.js";
import { CreateFlightFn, CreateFlightScheduleFn, CreateRouteFn } from '../../model/State.js';
import './FlightsListControl.css';

class FlightsListControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleListVisible: false,
      editedFlightIndex: null,
      editedFlight: null
    };
  }

  render() {
    if (this.state.scheduleListVisible) {
      return (
          <div className="flightsListWrapper">
            {this.renderInnerContent(true)}
          </div>
      );
    } else {
      return this.renderInnerContent(false);
    }
  }

  renderInnerContent(renderScheduleList) {
    return (
        <div className="flightsListControl">
          <button
              className="flightsListToggleButton"
              onClick={() => {this.toggleScheduleList()}}>
            Flights
          </button>
          {this.maybeRenderScheduleList(renderScheduleList)}
          {this.maybeRenderScheduleEditor()}
        </div>
    )
  }

  maybeRenderScheduleList(renderScheduleList=false) {
    if (renderScheduleList) {
      return (
            <FlightsList
                flights={this.props.flights}
                onAddSchedule={() => this.onAddSchedule()}
                onDeleteSchedule={this.props.deleteSchedule}
                onEditSchedule={(flightIndex) => this.editFlightByIndex(flightIndex)}
                onCloseWindowRequest={() => this.toggleScheduleList()}
            />
      )
    } else {
      return "";
    }
  }

  maybeRenderScheduleEditor() {
    if (this.state.editedFlightIndex !== null || this.state.editedFlight !== null) {
      const flight =
          this.state.editedFlight !== null ?
              this.state.editedFlight :
              this.props.flights[this.state.editedFlightIndex];
      const flightCode = `${AirlineIataCode}${flight.flightNumber}`;
      return (
          <FlightEditorComponent
              flight={flight}
              title={`AirYou flight ${flightCode}`}
              flightIndex={this.state.editedFlightIndex}
              onCloseWindowRequest={() => this.onEditorClosing()}>
            <FlightEditorRow
                label="Flight number"
                path={["flightNumber"]}
                valueRender={(flightNumber) => (`${AirlineIataCode}${flightNumber}`)}
                editComponent={<FlightCodeEditor/>}
            />
            <FlightEditorRow
                label="From"
                path={["route", "departureAirportCode"]}
                editComponent={<FlightAirportEditor/>}
            />
            <FlightEditorRow
                label="To"
                path={["route", "arrivalAirportCode"]}
                editComponent={<FlightAirportEditor/>}
            />
            <FlightEditorRow
                label="Airplane model"
                path={["airplaneIndex"]}
                valueRender={(airplaneIndex) => (
                    `${AIRPLANES[airplaneIndex].manufacturer} ${AIRPLANES[airplaneIndex].model}`)}
                editComponent={<FlightAirplaneEditor/>}
            />
            <FlightEditorRow
                label="Departure time"
                path={["schedule", "departureTime"]}
                valueRender={(time) => formatTime(new Date(2017, 0, 1, time.hours, time.minutes))}
                editComponent={<FlightScheduleClockTimeEditor />}
            />
            <FlightEditorRow
                label="Departs on"
                path={["schedule", "departureDaysOfWeek"]}
                valueRender={(input) => (
                    <FlightScheduleDaysOfWeekEditor initialValue={input} disabled="disabled" />
                )}
                editComponent={<FlightScheduleDaysOfWeekEditor />}
            />
          </FlightEditorComponent>
      )
    } else {
      return "";
    }
  }

  onAddSchedule() {
    this.editFlight(this.createNewFlight(this.props.flights));
  }

  createNewFlight(flights) {
    return CreateFlightFn(
        this.findNextAvailableFlightNumber(flights),
        AIRPLANES[0].shortName,
        CreateRouteFn(AIRPORTS[0].code, AIRPORTS[1].code),
        CreateFlightScheduleFn()
    );
  }

  findNextAvailableFlightNumber(flights) {
    let flightNumbers =
        flights.map(schedule => Number(schedule.flightNumber)).sort((a, b) => (a - b));
    let nextCandidateNumber = 1;
    for (let i = 0; i < flightNumbers.length; i++) {
      if (flightNumbers[i] > nextCandidateNumber) {
        break;
      } else if (flightNumbers[i] === nextCandidateNumber) {
        nextCandidateNumber++;
      }
    }

    return String(nextCandidateNumber);
  }

  onEditorClosing() {
    this.setState({
      editedFlight: null,
      editedFlightIndex: null
    });
  }

  editFlight(flight) {
    this.setState({editedFlight: flight});
  }

  editFlightByIndex(flightIndex) {
    this.setState({editedFlightIndex: flightIndex});
  }

  toggleScheduleList() {
    this.setState((prevState) => ({
      scheduleListVisible: !prevState.scheduleListVisible,
      editedFlightIndex: null,
      editedFlight: null,
    }));
  }
}

export default FlightsListControl;
