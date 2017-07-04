import React from 'react';
import Objects from '../../aux/Objects.js'
import './ScheduleEditor.css';
import '../common/ModalWindow.css';

class ScheduleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: props.flight };
  }

  saveInputByPath(path, value) {
    this.setState((prevState) => ({
      input: Objects.updateObject(prevState.input, path, value)
    }));
    if (!this.props.batchMode) {
      this.props.integrateSchedule(this.props.flightIndex, path, value);
    }
  }

  render() {
    let saveInputByPath = this.saveInputByPath.bind(this);
    return (
        <div className="modalWindow scheduleEditor">
          <div className="modalWindowClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
          <div className="modalWindowTitle">{this.props.title}</div>
          {this.enrichChildren(this.props.children, saveInputByPath)}
          {this.renderBatchModeElement()}
        </div>
    )
  }

  enrichChildren(children, onSaveCallback) {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onSave: onSaveCallback,
        flight: this.state.input
      });
    });
  }

  renderBatchModeElement() {
    if (this.props.batchMode) {
      return (
          <div className="clickableText"
               onClick={() => {
                 this.props.addSchedule(this.state.input);
                 this.props.onCloseWindowRequest();
               }}>
            Save schedule
          </div>
      );
    } else {
      return "";
    }
  }
}

export default ScheduleEditor;
