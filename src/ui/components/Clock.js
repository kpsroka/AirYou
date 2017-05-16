import React, { Component } from 'react';
import './Clock.css';
import { Time } from '../../Constants.js';

class Clock extends Component {

  constructor(...args) {
    super(...args);
    window.setInterval(() => { this.props.onTick() }, Time.TICK_PERIOD_MILLIS);
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
