import React, { Component } from 'react';
import ScheduleList from "./ScheduleList.js";
import "./ScheduleListControl.css";

class ScheduleListControl extends Component {
  constructor(props) {
    super(props);
    this.state = {scheduleListVisible: false};
  }

  render() {
    if (this.state.scheduleListVisible) {
      return (
          <div className="scheduleListWrapper">
            {this.renderInnerContent(true)}
          </div>
      );
    } else {
      return this.renderInnerContent(false);
    }
  }

  renderInnerContent(renderScheduleList) {
    return (
        <div className="scheduleListControl">
          <button
              className="scheduleListToggleButton"
              onClick={() => {this.toggleScheduleList()}}>
            Schedules
          </button>
          {this.maybeRenderScheduleList(renderScheduleList)}
        </div>
    )
  }

  maybeRenderScheduleList(renderScheduleList=false) {
    if (renderScheduleList) {
      return (
            <ScheduleList
                flights={this.props.flights}
                deleteSchedule={this.props.deleteSchedule}
                onCloseWindowRequest={() => this.toggleScheduleList()}
            />
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
