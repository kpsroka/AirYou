import React, { Component } from 'react';
import "./ScheduleList.css";

class ScheduleList extends Component {
  getDayOfWeekName(dayOfWeek) {
    // TODO: replace with proper formatting function call.
    switch (dayOfWeek) {
      case 0: return "Mon";
      case 1: return "Tue";
      case 2: return "Wed";
      case 3: return "Thu";
      case 4: return "Fri";
      case 5: return "Sat";
      case 6: return "Sun";
      default: return "???";
    }
  }

  render() {
    return (
      <div className="scheduleList">
        {this.props.flights.map((schedule) => {
          return (
            <div
              key="{schedule.flightId}"
              className="scheduleListItem">
              <span>{schedule.flightId}</span>
              <span>{schedule.departureHours}:{schedule.departureMinutes}</span>
              {schedule.departureDaysOfWeek.map((dayOfWeek) =>
                <span>{this.getDayOfWeekName(dayOfWeek)}</span>
              )}
            </div>
          )
        })}
      </div>
    );
  }
}

export default ScheduleList;