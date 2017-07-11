import { connect } from 'react-redux';
import FlightsListControl from './FlightsListControl.js';

function mapStateToProps(state) {
  return {
    flights: state.flights
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSchedule: (index) => dispatch({type: 'DELETE_SCHEDULE', payload: index}),
  }
}

const FlightsListComponent = connect(mapStateToProps, mapDispatchToProps)(FlightsListControl);

export default FlightsListComponent;
