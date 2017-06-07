import React from 'react';
import './ScheduleEditor.css';
import '../common/ModalWindow.css';

class ScheduleEditor extends React.Component {
  render() {
    return (
        <div className="modalWindow scheduleEditor">
          <div className="modalWindowClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
        </div>

    )
  }
}

export default ScheduleEditor;
