import React from 'react';
import './ScheduleList.css';
import '../common/ModalWindow.css';
import { AirlineIataCode } from '../../Constants.js';

let DAYS_OF_WEEK_RANGE = [0, 1, 2, 3, 4, 5, 6];

class ScheduleList extends React.Component {
  render() {
    return (
      <div className="modalWindow scheduleList">
        <div className="modalWindowClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
        <div className="modalWindowTitle">AirYou flight schedules</div>
        {this.props.flights.map((flight, index) => {
          return (
            <div
              key={index}
              className="scheduleListItem">
              <div className="scheduleListItemFlightCode">{AirlineIataCode}{flight.flightNumber}</div>
              <div className="scheduleListItemAirplaneShortName">{flight.airplane}</div>
              <div className="scheduleListItemRoute">
                {flight.route.departureAirportCode}-{flight.route.arrivalAirportCode}
              </div>
              <div className="scheduleListItemDepartureTime">
                {this.formatTime(flight.schedule.departureTime.hours, flight.schedule.departureTime.minutes)}
              </div>
              <div>
                {DAYS_OF_WEEK_RANGE.map((dayOfWeek) => (
                  this.getDayOfWeekTag(dayOfWeek, flight.schedule)
                ))}
              </div>
              <div onClick={() => this.props.onEditSchedule(index)}>Edit</div>
              <div onClick={() => this.props.onDeleteSchedule(index)}>Delete</div>
            </div>
          )
        })}
      </div>
    );
  }

  getDayOfWeekTag(dayOfWeek, schedule) {
    let tagClassName = schedule.departureDaysOfWeek[dayOfWeek] ?
        "activeDayOfWeek" : "inactiveDayOfWeek";
    return (
        <span key={dayOfWeek} className={tagClassName}>{this.getDayOfWeekName(dayOfWeek)}</span>
    );
  }

  getDayOfWeekName(dayOfWeek) {
    let timeFormatOptions = { weekday: "narrow" };
    /* May 1 2017 was Monday, so the day of May 2017 will match the desired day of week. */
    return Intl.DateTimeFormat("en-US", timeFormatOptions).format(new Date(2017, 4, dayOfWeek));
  }

  deleteSchedule(index) {
    this.props.deleteSchedule(index);
  }

  formatTime(hours, minutes) {
    let timeFormatOptions = { hour: "2-digit", minute: "2-digit" };
    return Intl.DateTimeFormat("en-US", timeFormatOptions)
        .format(new Date(2017, 0, 1, hours, minutes));
  }
}

export default ScheduleList;
