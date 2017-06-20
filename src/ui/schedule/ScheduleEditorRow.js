import React from 'react';
import './ScheduleEditorRow.css';

class ScheduleEditorRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: undefined,
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
        (this.isSaveable() ? "" : " disabled");
  }

  getCancelButtonClassNames() {
    return "scheduleEditorButton" + (this.state.editMode ? "" : " hidden");
  }

  setEditMode(value) {
    this.setState({editMode: value});
  }

  renderValue() {
    if (this.state.editMode && this.props.editComponent) {
      return React.cloneElement(this.props.editComponent, {
        onInputChange: (input) => {
          this.setState({input: input});
          this.props.onInputChange(input);
        }
      });
    }
    if (typeof this.props.valueRender === "function") {
      return this.props.valueRender(this.props.value);
    }
    return this.props.value;
  }

  onSaveButtonClick() {
    if (this.isSaveable()) {
      this.setEditMode(false);
      if (this.props.flightIndex !== undefined &&
          this.props.path !== undefined &&
          this.state.input !== undefined) {
        this.props.integrateSchedule(this.props.flightIndex, this.props.path, this.state.input);
      } else {
        this.props.onSave();
      }
    }
  }

  isSaveable() {
    return this.props.saveable && this.state.input !== undefined;
  }

  onAbortButtonClick() {
    this.setEditMode(false);
    this.props.onAbort();
  }
}

export default ScheduleEditorRow;
