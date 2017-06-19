import React from 'react';
import ScheduleAirportEditor from './ScheduleAirportEditor.js';
import ScheduleEditorRow from './ScheduleEditorRow.js';
import ScheduleFlightCodeEditor from './ScheduleFlightCodeEditor.js';
import './ScheduleEditor.css';
import '../common/ModalWindow.css';
import { AirlineIataCode } from '../../Constants.js';
import Objects from '../../aux/Objects.js';

let DAYS_OF_WEEK_RANGE = [0, 1, 2, 3, 4, 5, 6];

class ScheduleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.flight
    };
  }

  render() {
    let flightCode = `${AirlineIataCode}${this.props.flight.flightNumber}`;
    return (
        <div className="modalWindow scheduleEditor">
          <div className="modalWindowClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
          <div className="modalWindowTitle">AirYou flight {flightCode}</div>
          <ScheduleEditorRow
              label="Flight number"
              value={flightCode}
              saveable={this.canIntegrateFlightNumber()}
              editComponent={
                  <ScheduleFlightCodeEditor
                      initialValue={this.props.flight.flightNumber}
                      onInputChange={(input) => this.updateInput(["flightNumber"], input)}
                      />
              }
              onSave={() => this.integrateInput(["flightNumber"])}
              onAbort={() => this.resetInput(["flightNumber"])}
          />
          <ScheduleEditorRow
              label="From"
              value={this.props.flight.route.departureAirportCode}
              editComponent={
                <ScheduleAirportEditor
                    initialValue={this.props.flight.route.departureAirportCode}
                    onInputChange={
                      (input) => this.updateInput(["route", "departureAirportCode"], input)}
                    />
              }
              saveable={this.state.input.route.departureAirportCode !== this.props.flight.route.arrivalAirportCode}
              onSave={() => this.integrateInput(["route", "departureAirportCode"])}
              onAbort={() => this.resetInput(["route", "departureAirportCode"])}
          />
          <ScheduleEditorRow
              label="To"
              value={this.props.flight.route.arrivalAirportCode}
              editComponent={
                <ScheduleAirportEditor
                    initialValue={this.props.flight.route.arrivalAirportCode}
                    onInputChange={
                      (input) => this.updateInput(["route", "arrivalAirportCode"], input)}
                    />
              }
              saveable={this.state.input.route.arrivalAirportCode !== this.props.flight.route.departureAirportCode}
              onSave={() => this.integrateInput(["route", "arrivalAirportCode"])}
              onAbort={() => this.resetInput(["route", "arrivalAirportCode"])}
          />
          <ScheduleEditorRow label="Airplane model" value={this.props.flight.airplane}/>
          <ScheduleEditorRow label="Departure time"
                             value={this.formatTime(
                                 this.props.flight.schedule.departureHours,
                                 this.props.flight.schedule.departureMinutes)}/>
          <ScheduleEditorRow label="Departs on"
                             value={DAYS_OF_WEEK_RANGE.map((dayOfWeek) => (
                                 this.getDayOfWeekTag(dayOfWeek, this.props.flight.schedule)
                             ))}/>
        </div>
    )
  }

  updateInput(inputPathArray, inputValue) {
    this.setState(
        (prevState) => (
            {input: Objects.updateObject(prevState.input, inputPathArray, inputValue)}));
  }

  resetInput(inputPath) {
    this.updateInput(inputPath, Objects.getObjectValueByPath(this.props.flight, inputPath));
  }

  canIntegrateFlightNumber() {
    let oldFlightNumber = this.props.flight.flightNumber;
    let newFlightNumber = this.state.input.flightNumber;
    return String(oldFlightNumber) === String(newFlightNumber)
        || this.props.canIntegrateFlightNumber(newFlightNumber);
  }

  integrateInput(inputPath) {
    let newFlight =
        Objects.updateObject(
            this.props.flight,
            inputPath,
            Objects.getObjectValueByPath(this.state.input, inputPath));
    this.props.onSaveSchedule(newFlight);
  }

  formatTime(hours, minutes) {
    let timeFormatOptions = {hour: "2-digit", minute: "2-digit"};
    return Intl.DateTimeFormat("en-US", timeFormatOptions)
        .format(new Date(2017, 0, 1, hours, minutes));
  }

  getDayOfWeekTag(dayOfWeek, schedule) {
    let departsOnThisDay = (schedule.departureDaysOfWeek.indexOf(dayOfWeek) !== -1);
    return (
        <div key={dayOfWeek} className="scheduleEditorDepartureDayBlock">
          <div>{this.getDayOfWeekName(dayOfWeek)}</div>
          <input type="checkbox" id={dayOfWeek} disabled="disabled" checked={departsOnThisDay}/>
        </div>
    );
  }

  getDayOfWeekName(dayOfWeek) {
    let timeFormatOptions = { weekday: "short" };
    /* May 1 2017 was Monday, so the day of May 2017 will match the desired day of week. */
    return Intl.DateTimeFormat("en-US", timeFormatOptions).format(new Date(2017, 4, dayOfWeek));
  }
}

export default ScheduleEditor;
