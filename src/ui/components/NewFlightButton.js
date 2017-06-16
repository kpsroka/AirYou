import React from 'react';
import './NewFlightButton.css';

class NewFlightButton extends React.Component {
  render() {
    return (
      <button className="newFlightButton"
              onClick={() => this.props.createNewFlight(this.props.flightIndex)}>
        {this.props.buttonText}
      </button>
    )
  }
}

export default NewFlightButton;
