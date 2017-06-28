import React from 'react';
import { formatDayOfWeek, formatTime } from '../common/DateTimeFormatter.js';
import { AirlineIataCode } from '../../Constants.js';

import './ScheduleList.css';
import '../common/ClickableText.css';
import '../common/ModalWindow.css';

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
                {formatTime(
                    new Date(
                        2017, 0, 1,
                        flight.schedule.departureTime.hours,
                        flight.schedule.departureTime.minutes))}
              </div>
              <div>
                {DAYS_OF_WEEK_RANGE.map((dayOfWeek) => (
                  ScheduleList.getDayOfWeekTag(dayOfWeek, flight.schedule)
                ))}
              </div>
              <div className="clickableText"
                   onClick={() => this.props.onEditSchedule(index)}>Edit</div>
              <div className="clickableText"
                  onClick={() => this.props.onDeleteSchedule(index)}>Delete</div>
            </div>
          )
        })}
        <span className="scheduleListAddScheduleLabel clickableText">
          Add new schedule
        </span>
      </div>
    );
  }

  static getDayOfWeekTag(dayOfWeek, schedule) {
    let tagClassName = schedule.departureDaysOfWeek[dayOfWeek] ?
        "activeDayOfWeek" : "inactiveDayOfWeek";
    return (
        <span key={dayOfWeek} className={tagClassName}>{formatDayOfWeek(dayOfWeek)}</span>
    );
  }
}

export default ScheduleList;
