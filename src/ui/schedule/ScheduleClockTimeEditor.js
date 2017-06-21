import React from 'react';
import './ScheduleClockTimeEditor.css';

class ScheduleClockTimeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.initialValue;
  }

  render() {
    return (
      <div className="scheduleClockTimeEditor">
        <input id="hours"
               type="number"
               autoComplete="off"
               defaultValue={this.props.initialValue.hours}
               onInput={(inputEvent) => {this.onHoursChange(inputEvent.target.value)}}
               />
        :
        <input id="minutes"
               type="number"
               autoComplete="off"
               defaultValue={this.props.initialValue.minutes}
               onInput={(inputEvent) => {this.onMinutesChange(inputEvent.target.value)}}
        />
      </div>
    );
  }

  onHoursChange(hours) {
    this.setState({
        hours: parseInt(hours, 10)},
        () => {this.props.onInputChange(this.state)});
  }

  onMinutesChange(minutes) {
    this.setState({
        minutes: parseInt(minutes, 10)},
        () => {this.props.onInputChange(this.state)});
  }
}

export default ScheduleClockTimeEditor;