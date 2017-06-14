import React from 'react';
import ScheduleList from "./ScheduleList.js";
import ScheduleEditor from "./ScheduleEditor.js";
import "./ScheduleListControl.css";

class ScheduleListControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {scheduleListVisible: false, flightUnderEdition: null};
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
          {this.maybeRenderScheduleEditor()}
        </div>
    )
  }

  maybeRenderScheduleList(renderScheduleList=false) {
    if (renderScheduleList) {
      return (
            <ScheduleList
                flights={this.props.flights}
                onDeleteSchedule={this.props.deleteSchedule}
                onEditSchedule={(flightCode) => this.editSchedule(flightCode)}
                onCloseWindowRequest={() => this.toggleScheduleList()}
            />
      )
    } else {
      return "";
    }
  }
  maybeRenderScheduleEditor() {
    let flight =
        this.props.flights.find((flight) => (flight.flightCode === this.state.flightUnderEdition));
    if (flight) {
      return (
          <ScheduleEditor
              flight={flight}
              onCloseWindowRequest={() => this.editSchedule(null)} />
      )
    } else {
      return "";
    }
  }

  editSchedule(flightCode) {
    this.setState({flightUnderEdition: flightCode});
  }

  toggleScheduleList() {
    this.setState((prevState) => ({
      scheduleListVisible: !prevState.scheduleListVisible,
      flightUnderEdition: null
    }));
  }
}

export default ScheduleListControl;
