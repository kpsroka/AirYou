import { connect } from 'react-redux';
import FieldOfPlay from './FieldOfPlay.js';

function mapStateToProps(state) {
  return { airports: state.airports };
}

const FieldOfPlayComponent = connect(mapStateToProps)(FieldOfPlay);

export default FieldOfPlayComponent;
