import React from 'react';
import './ScheduleEditor.css';
import '../common/ModalWindow.css';

let DAYS_OF_WEEK_RANGE = [0, 1, 2, 3, 4, 5, 6];

class ScheduleEditor extends React.Component {
  render() {
    return (
        <div className="modalWindow scheduleEditor">
          <div className="modalWindowClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
          <div className="scheduleEditorRow">
            <div className="scheduleEditorLabel">Airline</div>
            <div className="scheduleEditorLabel">{this.props.flight.flightCode}</div>
          </div>
          <div className="scheduleEditorRow">
            <div className="scheduleEditorLabel">Flight number</div>
            <div className="scheduleEditorLabel">{this.props.flight.flightCode}</div>
          </div>
          <div className="scheduleEditorRow">
            <div className="scheduleEditorLabel">From</div>
            <div className="scheduleEditorLabel">{this.props.flight.route.departureAirportCode}</div>
          </div>
          <div className="scheduleEditorRow">
            <div className="scheduleEditorLabel">To</div>
            <div className="scheduleEditorLabel">{this.props.flight.route.arrivalAirportCode}</div>
          </div>
          <div className="scheduleEditorRow">
            <div className="scheduleEditorLabel">Airplane model</div>
            <div className="scheduleEditorLabel">{this.props.flight.airplane}</div>
          </div>
          <div className="scheduleEditorRow">
            <div className="scheduleEditorLabel">Departure time</div>
            <div className="scheduleEditorLabel">
              {this.formatTime(
                  this.props.flight.schedule.departureHours,
                  this.props.flight.schedule.departureMinutes)}
            </div>
          </div>
          <div className="scheduleEditorRow">
            <div className="scheduleEditorLabel">Departs on</div>
            <div className="scheduleEditorValue">
              {DAYS_OF_WEEK_RANGE.map((dayOfWeek) => (
                  this.getDayOfWeekTag(dayOfWeek, this.props.flight.schedule)
              ))}
            </div>
          </div>
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
