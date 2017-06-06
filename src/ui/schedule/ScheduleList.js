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
    // TODO: replace with proper formatting function call.
    switch (dayOfWeek) {
      case 0: return "M";
      case 1: return "T";
      case 2: return "W";
      case 3: return "T";
      case 4: return "F";
      case 5: return "S";
      case 6: return "S";
      default: return "?";
    }
  }

  render() {
    return (
      <div className="scheduleList">
        {this.props.flights.map((flight) => {
          return (
            <div
              key={flight.flightCode}
              className="scheduleListItem">
              <div>{flight.flightCode}</div>
              <div>{flight.route.departureAirportCode}-{flight.route.arrivalAirportCode}</div>
              <div>{flight.schedule.departureHours}:{flight.schedule.departureMinutes}</div>
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
}

export default ScheduleList;
