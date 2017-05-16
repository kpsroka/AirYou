const AirplaneInFlightReducer = (stateAirplanesInFlight, oldTimeMillis, newTimeMillis, action) => {
  switch (action.type) {
    case 'TIME_TICK':
      return stateAirplanesInFlight.map(
        (airplaneInFlight) => ({
          ...airplaneInFlight,
          distanceRemainingM:
              airplaneInFlight.distanceRemainingM -
              (airplaneInFlight.speedMps * (newTimeMillis - oldTimeMillis)) / 1000,
        })
      ).filter((airplaneInFlight) => airplaneInFlight.distanceRemainingM > 0);
    default:
      return stateAirplanesInFlight;
  }
};

export default AirplaneInFlightReducer;
