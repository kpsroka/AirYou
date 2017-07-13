import React from 'react';
import './AirportDetails.css';
import '../common/ModalWindow.css';

class AirportDetails extends React.Component {
  render() {
    return (
        <div className="airportDetailsContainer">
          <div className="modalWindowTitle">
            {this.props.airport.fullName}
          </div>
          <div className="airportDetailsSection">
            <div className="airportDetailsSectionTitle">
              Passenger demand
            </div>
            <div className="airportDetailsSectionValue">
              {this.props.airport.details.passengerDemand.map(
                  (paxDemand) => (
                      <div key={paxDemand.destinationAirportCode}
                          className="airportDetailsPaxDemandBlock">
                        <div>{paxDemand.destinationAirportCode}</div>
                        <div>{paxDemand.count} 👤</div>
                      </div>
                  )
              )}
            </div>
          </div>
        </div>
    );
  }
}

export default AirportDetails;
