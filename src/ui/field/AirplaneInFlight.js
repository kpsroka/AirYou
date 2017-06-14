import React from 'react';
import './AirplaneInFlight.css';
import BgImage from '../../../public/plane.svg';

class AirplaneInFlight extends React.Component {
  positionToCssOffset(position) {
    return {
      bottom: position.y + "%",
      left: position.x + "%"
    };
  }

  rotationToCssTransform(rotation) {
    return {
      transform: `rotate(${rotation}deg)`
    }
  }

  render() {
    return (
      <div className="airplaneInFlight"
           style={this.positionToCssOffset(this.props.airplane.position)}>
        <img
            className="airplaneIcon"
            style={this.rotationToCssTransform(this.props.airplane.rotation)}
            src={BgImage}
            role="presentation" />
        <div className="flightCode">{this.props.airplane.flightCode}</div>
      </div>
    )
  }
}

export default AirplaneInFlight;
