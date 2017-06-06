import React, { Component } from 'react';
import "./NewFlightButton.css";

class NewFlightButton extends Component {
  render() {
    return (
      <button className="newFlightButton"
              onClick={() => this.props.createNewFlight(this.props.flightCode)}>
        {this.props.buttonText}
      </button>
    )
  }
}

export default NewFlightButton;
