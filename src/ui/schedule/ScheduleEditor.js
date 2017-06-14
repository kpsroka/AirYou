import React from 'react';
import ScheduleEditorRow from './ScheduleEditorRow.js';
import ScheduleFlightCodeEditor from './ScheduleFlightCodeEditor.js';
import './ScheduleEditor.css';
import '../common/ModalWindow.css';

let DAYS_OF_WEEK_RANGE = [0, 1, 2, 3, 4, 5, 6];

class ScheduleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        flightNumber: getFlightNumber(this.props.flight.flightCode),
      }
    };
  }

  render() {
    return (
        <div className="modalWindow scheduleEditor">
          <div className="modalWindowClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
          <div className="modalWindowTitle">AirYou flight {this.props.flight.flightCode}</div>
          <ScheduleEditorRow
              label="Flight number"
              value={this.props.flight.flightCode}
              saveable={this.canIntegrateInput()}
              editComponent={
                  <ScheduleFlightCodeEditor
                      airlineIataCode={getAirlineIataCode(this.props.flight.flightCode)}
                      initialValue={getFlightNumber(this.props.flight.flightCode)}
                      onInputChange={(input) => this.updateInputState({flightNumber: input})}/>
              }
          />
          <ScheduleEditorRow label="From" value={this.props.flight.route.departureAirportCode}/>
          <ScheduleEditorRow label="To" value={this.props.flight.route.arrivalAirportCode}/>
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

  updateInputState(partialInputState) {
    this.setState((prevState) => ({input: Object.assign({}, prevState.input, partialInputState)}));
  }

  canIntegrateInput() {
    return this.canIntegrateFlightNumber();
  }

  canIntegrateFlightNumber() {
    let oldFlightCode = getFlightNumber(this.props.flight.flightCode);
    let newFlightCode = this.state.input.flightNumber;

    return String(oldFlightCode) === String(newFlightCode);
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

function getAirlineIataCode(flightCode) {
  return flightCode.slice(0, 2);
}

function getFlightNumber(flightCode) {
  return flightCode.slice(2);
}

export default ScheduleEditor;
