import { connect } from 'react-redux';
import Clock from './Clock.js';
import { Time } from '../../Constants.js';


let DATE_FORMAT_OPTIONS = {
  year: "numeric", month: "short", day: "numeric"
};

let TIME_FORMAT_OPTIONS = {
  hour: "2-digit", minute: "2-digit"
};

function mapStateToProps(state) {
  return {
    displayDate: toDisplayDate(state.time.millis),
    displayTime: toDisplayTime(state.time.millis),
    tickSpeedSymbol: toTickSpeedSymbol(state.time.tick)
  };
}

function toDisplayDate(millis) {
  return new Intl.DateTimeFormat("en-US", DATE_FORMAT_OPTIONS).format(millis);
}

function toDisplayTime(millis) {
  return new Intl.DateTimeFormat("en-US", TIME_FORMAT_OPTIONS).format(millis);
}

function toTickSpeedSymbol(tick) {
  if (tick <= 0) {
    return "⏸";
  } else if (tick <= Time.SLOW_TICK_MILLIS) {
    return "▶";
  } else {
    return "⏩";
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onTick: () => dispatch({type: 'TIME_TICK'}),
    onTickChange: () => dispatch({type: 'TIME_TICK_CHANGE'})
  };
}

const ClockComponent = connect(mapStateToProps, mapDispatchToProps)(Clock);

export default ClockComponent;