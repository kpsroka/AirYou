const AirplaneInFlightReducer = (stateAirplanesInFlight, action) => {
  switch (action.type) {
    case 'NEW_FLIGHT':
      return [
        ...stateAirplanesInFlight,
        {
          flight: action.payload,
          distanceRemainingM: action.payload.distanceKm * 1000,
          speedMps: 150
        }
      ];
    default:
      return stateAirplanesInFlight;
  }
};

export default AirplaneInFlightReducer;
