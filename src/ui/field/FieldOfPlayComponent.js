import { connect } from 'react-redux';
import FieldOfPlay from './FieldOfPlay.js';

function mapStateToProps(state) {
  return {
    airplanesInFlight: state.airplanesInFlight
  };
}

const FieldOfPlayComponent = connect(mapStateToProps)(FieldOfPlay);

export default FieldOfPlayComponent;
