import { connect } from 'react-redux';
import ScheduleListControl from './ScheduleListControl.js';

function mapStateToProps(state) {
  return { flights: state.flights };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSchedule: (flightId) => dispatch({type: 'DELETE_SCHEDULE', payload: flightId})
  }
}

const ScheduleListComponent = connect(mapStateToProps, mapDispatchToProps)(ScheduleListControl);

export default ScheduleListComponent;
