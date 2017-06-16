import { connect } from 'react-redux';
import ScheduleListControl from './ScheduleListControl.js';

function mapStateToProps(state) {
  return {
    flights: state.flights,
    canIntegrateFlight: (flight) => (canIntegrateFlight(state, flight)),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSchedule: (index) => dispatch({type: 'DELETE_SCHEDULE', payload: index}),
    saveSchedule: (index, flight) => dispatch({
        type: 'SAVE_SCHEDULE',
        payload: {index: index, flight: flight}
    })
  }
}

function canIntegrateFlight(state, newFlight) {
  return !hasFlight(state.flights, newFlight.flightNumber);
}

function hasFlight(flights, flightNumber) {
  return Boolean(flights.find((flight) => (flight && flight.flightNumber === flightNumber)));
}

const ScheduleListComponent = connect(mapStateToProps, mapDispatchToProps)(ScheduleListControl);

export default ScheduleListComponent;
