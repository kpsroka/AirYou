import { connect } from 'react-redux';
import ScheduleListControl from './ScheduleListControl.js';

function mapStateToProps(state) {
  return {
    flights: state.flights
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSchedule: () => dispatch({type: 'ADD_SCHEDULE'}),
    deleteSchedule: (index) => dispatch({type: 'DELETE_SCHEDULE', payload: index}),
  }
}

const ScheduleListComponent = connect(mapStateToProps, mapDispatchToProps)(ScheduleListControl);

export default ScheduleListComponent;
