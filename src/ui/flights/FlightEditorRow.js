import React from 'react';
import './FlightEditorRow.css';

class FlightEditorRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.value,
      editMode: false
    }
  }

  render() {
    return (
      <div className="flightEditorRow">
        <div className="flightEditorLabel">{this.props.label}</div>
        <div className="flightEditorValue">
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
    return "flightEditorButton" + (this.state.editMode ? " hidden" : "");
  }

  getSaveButtonClassNames() {
    return "flightEditorButton" +
        (this.state.editMode ? "" : " hidden") +
        (this.isSaveable() ? "" : " disabled");
  }

  getCancelButtonClassNames() {
    return "flightEditorButton" + (this.state.editMode ? "" : " hidden");
  }

  setEditMode(value) {
    this.setState({editMode: value});
  }

  renderValue() {
    if (this.state.editMode && this.props.editComponent) {
      return React.cloneElement(this.props.editComponent, {
        onInputChange: (input) => {
          this.setState({input: input});
        },
        initialValue: this.props.value
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
      if (this.props.path !== undefined &&
          this.state.input !== undefined) {
        this.props.onSave(this.props.path, this.state.input);
      }
    }
  }

  isSaveable() {
    return this.state.input !== undefined &&
        this.state.input !== this.props.value &&
        (this.props.canIntegrate === undefined || this.props.canIntegrate(this.state.input));
  }

  onAbortButtonClick() {
    this.setEditMode(false);
  }
}

export default FlightEditorRow;
