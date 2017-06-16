import { connect } from 'react-redux';
import NewFlights from './NewFlights.js';

function mapStateToProps(state) {
  return { flights: state.flights };
}

function mapDispatchToProps(dispatch) {
  return {
    createNewFlight: (flightIndex) => dispatch({type: 'NEW_FLIGHT', payload: flightIndex})
  }
}

const NewFlightsComponent = connect(mapStateToProps, mapDispatchToProps)(NewFlights);

export default NewFlightsComponent;
