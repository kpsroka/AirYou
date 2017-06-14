import React from 'react';
import './ScheduleEditorRow.css';

class ScheduleEditorRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      validInput: true,
    }
  }

  render() {
    return (
      <div className="scheduleEditorRow">
        <div className="scheduleEditorLabel">{this.props.label}</div>
        <div className="scheduleEditorValue">
          {this.renderValue()}
        </div>
        <div className={this.getEditButtonClassNames()}
             onClick={() => this.setEditMode(true)}>
          <div>✍</div>
          <div>EDIT</div>
        </div>
        <div className={this.getSaveButtonClassNames()}>
          <div>✓</div>
          <div>SAVE</div>
        </div>
        <div className={this.getCancelButtonClassNames()}>
          <div>✖</div>
          <div>ABORT</div>
        </div>
      </div>
    );
  }

  getEditButtonClassNames() {
    return "scheduleEditorButton" + (this.state.editMode ? " hidden" : "");
  }

  getSaveButtonClassNames() {
    return "scheduleEditorButton" + (this.state.editMode ? "" : " hidden");
  }

  getCancelButtonClassNames() {
    return "scheduleEditorButton" + (this.state.editMode ? "" : " hidden");
  }

  setEditMode(value) {
    this.setState({editMode: value});
  }

  renderValue() {
    if (this.state.editMode && this.props.editComponent) {
      return this.props.editComponent;
    }
    return this.props.value;
  }
}

export default ScheduleEditorRow;
