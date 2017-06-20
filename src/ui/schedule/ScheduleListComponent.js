import { connect } from 'react-redux';
import ScheduleListControl from './ScheduleListControl.js';

function mapStateToProps(state) {
  return {
    flights: state.flights,
    canIntegrateFlightNumber:
        (newFlightNumber) => canIntegrateFlightNumber(state, newFlightNumber)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSchedule: (index) => dispatch({type: 'DELETE_SCHEDULE', payload: index}),
    integrateSchedule: (index, propertyPath, propertyValue) => dispatch({
      type: 'INTEGRATE_SCHEDULE',
      payload: {flightIndex: index, propertyPath: propertyPath, propertyValue: propertyValue}
    })
  }
}

function canIntegrateFlightNumber(state, newFlightNumber) {
  return !hasFlight(state.flights, newFlightNumber);
}

function hasFlight(flights, flightNumber) {
  return Boolean(flights.find((flight) => (flight && flight.flightNumber === flightNumber)));
}

const ScheduleListComponent = connect(mapStateToProps, mapDispatchToProps)(ScheduleListControl);

export default ScheduleListComponent;
