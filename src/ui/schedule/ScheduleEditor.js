import React from 'react';
import ScheduleAirportEditor from './ScheduleAirportEditor.js';
import ScheduleEditorRowComponent from './ScheduleEditorRowComponent.js';
import ScheduleFlightCodeEditor from './ScheduleFlightCodeEditor.js';
import './ScheduleEditor.css';
import '../common/ModalWindow.css';
import { AirlineIataCode } from '../../Constants.js';

let DAYS_OF_WEEK_RANGE = [0, 1, 2, 3, 4, 5, 6];

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
              value={this.props.flight.airplane}/>
          <ScheduleEditorRowComponent
              label="Departure time"
              value={this.formatTime(
                  this.props.flight.schedule.departureTime.hours,
                  this.props.flight.schedule.departureTime.minutes)}/>
          <ScheduleEditorRowComponent
              label="Departs on"
              value={DAYS_OF_WEEK_RANGE.map((dayOfWeek) => (
                  this.getDayOfWeekTag(dayOfWeek, this.props.flight.schedule)
               ))}/>
        </div>
    )
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
