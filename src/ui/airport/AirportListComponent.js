import { connect } from 'react-redux';
import AirportList from './AirportList.js';
import { AIRPORTS } from '../../model/Airports.js';

function mapStateToProps(state) {
  return {
    airports:
        AIRPORTS.map((airport) => Object.assign(
            {},
            airport,
            { details: state.airportDetails.find(
                (stateAirport) => (airport.code === stateAirport.airportCode)) }
        )
    )
  };
}

const AirportListComponent = connect(mapStateToProps)(AirportList);

export default AirportListComponent;
