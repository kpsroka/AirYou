import React, { Component } from 'react';
import ScheduleList from "./ScheduleList.js";
import "./ScheduleListControl.css";

class ScheduleListControl extends Component {
  constructor(props) {
    super(props);
    this.state = {scheduleListVisible: false};
  }

  render() {
    return (
        <div className="scheduleListControl">
          <button
              className="scheduleListToggleButton"
              onClick={() => {this.toggleScheduleList()}}>
            Schedules
          </button>
          {this.maybeRenderScheduleList()}
        </div>
    )
  }

  maybeRenderScheduleList() {
    if (this.state.scheduleListVisible) {
      return (
          <ScheduleList flights={this.props.flights} deleteSchedule={this.props.deleteSchedule} />
      )
    } else {
      return "";
    }
  }

  toggleScheduleList() {
    this.setState((prevState) => ({scheduleListVisible: !prevState.scheduleListVisible}));
  }
}

export default ScheduleListControl;
