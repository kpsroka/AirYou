import React from 'react';
import Objects from '../../aux/Objects.js'
import './FlightEditor.css';
import '../common/ModalWindow.css';

class FlightEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: props.flight };
  }

  saveInputByPath(path, value) {
    this.setState((prevState) => ({
      input: Objects.updateObject(prevState.input, path, value)
    }));
    if (this.props.flightIndex) {
      this.props.integrateSchedule(this.props.flightIndex, path, value);
    }
  }

  render() {
    let saveInputByPath = this.saveInputByPath.bind(this);
    return (
        <div className="modalWindow flightEditor">
          <div className="modalWindowClose" onClick={() => this.props.onCloseWindowRequest()}>✖</div>
          <div className="modalWindowTitle">{this.props.title}</div>
          {this.enrichChildren(this.props.children, saveInputByPath)}
          {this.renderSaveFlightElement()}
        </div>
    )
  }

  enrichChildren(children, onSaveCallback) {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onSave: onSaveCallback,
        value: Objects.getObjectValueByPath(this.state.input, child.props.path),
        canIntegrate: (input) => this.props.canIntegrate(child.props.path, input)
      });
    });
  }

  renderSaveFlightElement() {
    if (!this.props.flightIndex) {
      return (
          <div className="saveFlightButton clickableText"
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

export default FlightEditor;
