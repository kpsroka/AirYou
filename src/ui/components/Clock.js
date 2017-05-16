import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {

  constructor(...args) {
    super(...args);
    window.setInterval(() => { this.props.onTick() }, 250);
  }

  render() {
    return (
      <div className="DateTimeContainer">
        <div>{this.props.displayDate}</div>
        <div className="DateTimeSpacer" />
        <div>{this.props.displayTime}</div>
        <div className="DateTimeSpacer" />
        <div onClick={() => {this.props.onTickChange()}}>
          {this.props.tickSpeedSymbol}
        </div>
      </div>
    );
  }
}

export default Clock;
