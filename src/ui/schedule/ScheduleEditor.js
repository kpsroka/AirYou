import React from 'react';
import './ScheduleEditor.css';

class ScheduleEditor extends React.Component {
  render() {
    return (
        <div className="scheduleEditor">
          <div className="scheduleEditorClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
        </div>

    )
  }
}

export default ScheduleEditor;
