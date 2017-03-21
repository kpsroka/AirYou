import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {

  constructor(...args) {
    super(...args);
    window.setInterval(() => { this.props.onTick() }, 1000);
  }

  render() {
    return (
      <div className="DateTimeContainer">
        <div>{this.props.displayDate}</div>
        <div className="DateTimeSpacer" />
        <div>{this.props.displayTime}</div>
      </div>
    );
  }
}

export default Clock;
