import React from 'react';
import ScheduleList from './ScheduleList.js';
import ScheduleEditor from './ScheduleEditor.js';
import './ScheduleListControl.css';

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
                onEditSchedule={(flightIndex) => this.editSchedule(flightIndex)}
                onCloseWindowRequest={() => this.toggleScheduleList()}
            />
      )
    } else {
      return "";
    }
  }
  maybeRenderScheduleEditor() {
    if (this.state.flightUnderEdition !== null &&
        this.props.flights[this.state.flightUnderEdition]) {
      return (
          <ScheduleEditor
              flight={this.props.flights[this.state.flightUnderEdition]}
              onCloseWindowRequest={() => this.editSchedule(null)} />
      )
    } else {
      return "";
    }
  }

  editSchedule(flightIndex) {
    this.setState({flightUnderEdition: flightIndex});
  }

  toggleScheduleList() {
    this.setState((prevState) => ({
      scheduleListVisible: !prevState.scheduleListVisible,
      flightUnderEdition: null
    }));
  }
}

export default ScheduleListControl;
