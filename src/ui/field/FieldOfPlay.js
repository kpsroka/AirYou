import React from 'react';
import { AIRPORTS } from '../../model/Airports.js'
import AirplaneInFlight from './AirplaneInFlight.js';
import Airport from './Airport.js';
import './FieldOfPlay.css';
import BgImage from '../../../public/US.svg';

class FieldOfPlay extends React.Component {
  render() {
    return (
      <div className="FieldOfPlay">
        <img className="BackgroundImage" src={BgImage} role="presentation" />
        {AIRPORTS.map((airport) => (
          <Airport
            key={airport.code}
            code={airport.code}
            position={airport.position} />
        ))}
        {this.props.airplanesInFlight.map((airplane) => {
          return <AirplaneInFlight
            key={airplane.flightNumber}
            airplane={airplane}
          />
        })}
      </div>
    );
  }
}

export default FieldOfPlay;
