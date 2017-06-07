import React, { Component } from 'react';
import "./ScheduleList.css";

let DAYS_OF_WEEK_RANGE = [0, 1, 2, 3, 4, 5, 6];

class ScheduleList extends Component {
  getDayOfWeekTag(dayOfWeek, schedule) {
    let tagClassName = (schedule.departureDaysOfWeek.indexOf(dayOfWeek) === -1)
        ? "inactiveDayOfWeek" : "activeDayOfWeek";
    return (
        <span className={tagClassName}>{this.getDayOfWeekName(dayOfWeek)}</span>
    );
  }

  getDayOfWeekName(dayOfWeek) {
    let timeFormatOptions = { weekday: "narrow" };
    /* May 1 2017 was Monday, so the day of May 2017 will match the desired day of week. */
    return Intl.DateTimeFormat("en-US", timeFormatOptions).format(new Date(2017, 4, dayOfWeek));
  }

  render() {
    return (
      <div className="scheduleList">
        <div className="scheduleListClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
        {this.props.flights.map((flight) => {
          return (
            <div
              key={flight.flightCode}
              className="scheduleListItem">
              <div>{flight.flightCode}</div>
              <div>{flight.route.departureAirportCode}-{flight.route.arrivalAirportCode}</div>
              <div>{this.formatTime(flight.schedule.departureHours, flight.schedule.departureMinutes)}</div>
              <div>
                {DAYS_OF_WEEK_RANGE.map((dayOfWeek) => (
                  this.getDayOfWeekTag(dayOfWeek, flight.schedule)
                ))}
              </div>
              <div onClick={() => this.deleteSchedule(flight.flightCode)}>Delete</div>
            </div>
          )
        })}
      </div>
    );
  }

  deleteSchedule(flightId) {
    this.props.deleteSchedule(flightId);
  }

  formatTime(hours, minutes) {
    let timeFormatOptions = { hour: "2-digit", minute: "2-digit" };
    return Intl.DateTimeFormat("en-US", timeFormatOptions)
        .format(((hours * 24) + (minutes)) * 1000 * 60);
  }
}

export default ScheduleList;
