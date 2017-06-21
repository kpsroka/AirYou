import React from 'react';
import './ScheduleDaysOfWeekEditor.css';

let DAYS_OF_WEEK_RANGE = [0, 1, 2, 3, 4, 5, 6];

class ScheduleDaysOfWeekEditor extends React.Component {
  render() {
    return (
        <div className="scheduleDaysOfWeekEditor">
          {DAYS_OF_WEEK_RANGE.map(
              dayOfWeek => this.getDayOfWeekTag(dayOfWeek, this.props.initialValue))}
        </div>
    );
  }

  getDayOfWeekTag(dayOfWeek, departureDaysOfWeek) {
    let departsOnThisDay = (departureDaysOfWeek.indexOf(dayOfWeek) !== -1);
    return (
        <div key={dayOfWeek} className="scheduleEditorDayBlock">
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

export default ScheduleDaysOfWeekEditor;