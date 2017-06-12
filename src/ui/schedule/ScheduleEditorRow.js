import React from 'react';
import './ScheduleEditorRow.css';

class ScheduleEditorRow extends React.Component {
  render() {
    return (
      <div className="scheduleEditorRow">
        <div className="scheduleEditorLabel">{this.props.label}</div>
        <div className="scheduleEditorValue">
          {this.renderValue()}
        </div>
        <div className="scheduleEditorEditButton">✍</div>
      </div>
    );
  }

  renderValue() {
    return this.props.value;
  }
}

export default ScheduleEditorRow;
