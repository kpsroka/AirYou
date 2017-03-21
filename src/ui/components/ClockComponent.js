import { connect } from 'react-redux';
import Clock from './Clock.js';

let DATE_FORMAT_OPTIONS = {
  year: "numeric", month: "short", day: "numeric"
}

let TIME_FORMAT_OPTIONS = {
  hour: "2-digit", minute: "2-digit"
}

function mapStateToProps(state) {
  return {
    displayDate: toDisplayDate(state.time.millis),
    displayTime: toDisplayTime(state.time.millis),
    tickSpeedSymbol: String.fromCharCode(9654),
  };
}

function toDisplayDate(millis) {
  return new Intl.DateTimeFormat("en-US", DATE_FORMAT_OPTIONS).format(millis);
}

function toDisplayTime(millis) {
  return new Intl.DateTimeFormat("en-US", TIME_FORMAT_OPTIONS).format(millis);
}

function mapDispatchToProps(dispatch) {
  return {
    onTick: () => dispatch({type: 'TIME_TICK'}),
    onTickChange: () => dispatch({type: 'TIME_TICK_CHANGE'})
  };
}

const ClockComponent = connect(mapStateToProps, mapDispatchToProps)(Clock);

export default ClockComponent;
