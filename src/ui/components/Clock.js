import React, { Component } from 'react';
import './Clock.css';

let MINUTE_IN_MILLIS = 60000;
let DATE_FORMAT_OPTIONS = {
  year: "numeric", month: "short", day: "numeric"
}
let TIME_FORMAT_OPTIONS = {
  hour: "2-digit", minute: "2-digit"
}

class Clock extends Component {

  constructor(...args) {
    super(...args);
    this.state = { date: new Date() };

    window.setInterval(() => { this.tick() }, 1000);
  }

  tick() {
    this.setState((prevState) => {
      var prevDate = prevState.date;
      var newDate = new Date();
      newDate.setTime(prevDate.getTime() + MINUTE_IN_MILLIS);

      return { date: newDate }
    });
  }

  render() {
    return (
      <div className="DateTimeContainer">
        <div>
          {new Intl.DateTimeFormat("en-US", DATE_FORMAT_OPTIONS).format(this.state.date)}
        </div>
        <div className="DateTimeSpacer" />
        <div>
          {new Intl.DateTimeFormat("en-US", TIME_FORMAT_OPTIONS).format(this.state.date)}
        </div>
      </div>

    );
  }
}

export default Clock;
