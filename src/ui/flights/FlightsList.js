import React from 'react';
import { formatDayOfWeek, formatTime } from '../common/DateTimeFormatter.js';
import { AirlineIataCode } from '../../Constants.js';
import { AIRPLANES } from '../../model/Airplanes.js';

import './FlightsList.css';
import '../common/ClickableText.css';
import '../common/ModalWindow.css';

let DAYS_OF_WEEK_RANGE = [0, 1, 2, 3, 4, 5, 6];

class FlightsList extends React.Component {
  render() {
    return (
      <div className="modalWindow flightsList">
        <div className="modalWindowClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
        <div className="modalWindowTitle">AirYou flight schedules</div>
        {this.props.flights.map((flight, index) => {
          return (
            <div
              key={index}
              className="flightsListItem">
              <div className="flightsListItemFlightCode">
                {AirlineIataCode}{flight.flightNumber}
              </div>
              <div className="flightsListItemAirplaneShortName">
                {AIRPLANES[flight.airplaneIndex].shortName}
              </div>
              <div className="flightsListItemRoute">
                {flight.route.departureAirportCode}-{flight.route.arrivalAirportCode}
              </div>
              <div className="flightsListItemDepartureTime">
                {formatTime(
                    new Date(
                        2017, 0, 1,
                        flight.schedule.departureTime.hours,
                        flight.schedule.departureTime.minutes))}
              </div>
              <div>
                {DAYS_OF_WEEK_RANGE.map((dayOfWeek) => (
                  FlightsList.getDayOfWeekTag(dayOfWeek, flight.schedule)
                ))}
              </div>
              <div className="clickableText"
                   onClick={() => this.props.onEditSchedule(index)}>Edit</div>
              <div className="clickableText"
                  onClick={() => this.props.onDeleteSchedule(index)}>Delete</div>
            </div>
          )
        })}
        <span className="addFlightLabel clickableText"
            onClick={() => this.props.onAddSchedule()}>
          Add new flight
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

export default FlightsList;
