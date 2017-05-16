const AirplaneInFlightReducer = (stateAirplanesInFlight, oldTimeMillis, newTimeMillis, action) => {
  switch (action.type) {
    case 'TIME_TICK': {
      return stateAirplanesInFlight.map(
        (airplaneInFlight) => {
          let newDistanceRemaining =
            airplaneInFlight.distanceRemainingM -
            (airplaneInFlight.speedMps * (newTimeMillis - oldTimeMillis)) / 1000;
          return {
          ...airplaneInFlight,
          distanceRemainingM: newDistanceRemaining,
        }}
      ).filter((airplaneInFlight) => airplaneInFlight.distanceRemainingM > 0);
    }
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
