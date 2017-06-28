import { connect } from 'react-redux';
import Clock from './Clock.js';
import { formatDate, formatTime } from '../common/DateTimeFormatter.js';
import { Time } from '../../Constants.js';

function mapStateToProps(state) {
  return {
    displayDate: formatDate(state.time.millis),
    displayTime: formatTime(state.time.millis),
    tickSpeedSymbol: toTickSpeedSymbol(state.time.tick)
  };
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
