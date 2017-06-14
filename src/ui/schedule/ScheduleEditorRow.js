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
        <div className={this.getSaveButtonClassNames()} onClick={() => this.onSaveButtonClick()}>
          <div>✓</div>
          <div>SAVE</div>
        </div>
        <div className={this.getCancelButtonClassNames()} onClick={() => this.onAbortButtonClick()}>
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
    return "scheduleEditorButton" +
        (this.state.editMode ? "" : " hidden") +
        (this.props.saveable ? "" : " disabled");
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

  onSaveButtonClick() {
    if (this.props.saveable) {
      this.setEditMode(false);
      this.props.onSave();
    }
  }

  onAbortButtonClick() {
    this.setEditMode(false);
    this.props.onAbort();
  }
}

export default ScheduleEditorRow;
