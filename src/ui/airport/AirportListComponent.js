import { connect } from 'react-redux';
import AirportList from './AirportList.js';
import { AIRPORTS } from '../../model/Airports.js';

function mapStateToProps() {
  return {
    airports: AIRPORTS
  };
}

const AirportListComponent = connect(mapStateToProps)(AirportList);

export default AirportListComponent;
