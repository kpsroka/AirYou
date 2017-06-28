import React from 'react';
import { formatDayOfWeek } from '../common/DateTimeFormatter.js';
import './ScheduleDaysOfWeekEditor.css';

let DAYS_OF_WEEK_RANGE = [0, 1, 2, 3, 4, 5, 6];

class ScheduleDaysOfWeekEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daysOfWeek: props.initialValue
    };
  }

  render() {
    return (
        <div className="scheduleDaysOfWeekEditor">
          {DAYS_OF_WEEK_RANGE.map(
              dayOfWeek => this.getDayOfWeekTag(dayOfWeek, this.props.initialValue))}
        </div>
    );
  }

  getDayOfWeekTag(dayOfWeek, departureDaysOfWeek) {
    return (
        <div key={dayOfWeek} className="scheduleEditorDayBlock">
          <div>{formatDayOfWeek(dayOfWeek)}</div>
          <input
              type="checkbox"
              id={dayOfWeek}
              disabled={this.props.disabled}
              defaultChecked={departureDaysOfWeek[dayOfWeek]}
              onChange={(event) => {this.onCheckboxChange(dayOfWeek, event.target.checked)}}/>
        </div>
    );
  }

  onCheckboxChange(dayOfWeek, checked) {
    this.setState(
        (prevState) => {
          let newDaysOfWeek = prevState.daysOfWeek.slice();
          newDaysOfWeek[dayOfWeek] = Boolean(checked);
          return {daysOfWeek: newDaysOfWeek};
        },
        () => {this.props.onInputChange(this.state.daysOfWeek)});
  }
}

export default ScheduleDaysOfWeekEditor;
