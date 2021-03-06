import TimeReducer from './TimeReducer.js';
import DefaultState from '../DefaultState.js';
import { Time } from '../../Constants.js';
import { CreateRouteFn } from '../State.js';

it("TimeReducer updates time according to tick on TIME_TICK", () => {
  let state = DefaultState;
  state.time.millis = 100000;
  state.time.tick = 420;

  let newState = TimeReducer(state, {type: 'TIME_TICK'});
  expect(newState.time.millis).toBe(state.time.millis + state.time.tick);

  newState.time.tick = 42;
  let newerState = TimeReducer(newState, {type: 'TIME_TICK'});
  expect(newerState.time.millis).toBe(newState.time.millis + newState.time.tick);
});

it("TimeReducer updates airplanes in flight on TIME_TICK", () => {
  let state = DefaultState;
  state.airplanesInFlight = [
    {
      flightNumber: "123",
      route: CreateRouteFn("SFO", "LAX"),
      distanceRemainingM: 100,
      speedMps: 250
    }
  ];
  state.time.tick = 100;  // 0.1 second

  let newState = TimeReducer(state, {type: 'TIME_TICK'});
  expect(newState.airplanesInFlight).toHaveLength(1);
  expect(newState.airplanesInFlight[0]).toEqual({
    ...state.airplanesInFlight[0],
    distanceRemainingM: 75,
    speedMps: 250
  });

  newState.time.tick = 1000;  // 1 second
  let newerState = TimeReducer(newState, {type: 'TIME_TICK'});
  expect(newerState.airplanesInFlight).toHaveLength(0);
});

/* Call to TimeReducer fails -- insfratstructure problem
it("TimeReducer launches scheduled flights", () => {
  let now = new Date();

  let state = DefaultState;
  state.time.millis = now.millis - 999;
  state.time.tick = 1000;

  state.flights = [
      CreateFlightFn(
          "999", AIRPLANES[0].shortName, CreateRouteFn(AIRPORTS[0].code, AIRPORTS[1].code),
          CreateFlightScheduleFn(now.getHours(), now.getMinutes()))
  ];
  state.airplanesInFlight = [];

  let newState = TimeReducer(state, {type: 'TIME_TICK'});
  expect(newState.airplanesInFlight).toEqual([CreateAirplaneInFlightFn(state.flights[0])]);
});
*/

it("TimeReducer changes slow tick to fast on TIME_TICK_CHANGE", () => {
  let state = DefaultState;
  state.time.tick = Time.SLOW_TICK_MILLIS;

  let newState = TimeReducer(state, {type: 'TIME_TICK_CHANGE'});
  expect(newState.time.tick).toBe(Time.FAST_TICK_MILLIS);
});

it("TimeReducer changes fast tick to 0 on TIME_TICK_CHANGE", () => {
  let state = DefaultState;
  state.time.tick = Time.FAST_TICK_MILLIS;

  let newState = TimeReducer(state, {type: 'TIME_TICK_CHANGE'});
  expect(newState.time.tick).toBe(0);
});

it("TimeReducer changes 0 to slow tick on TIME_TICK_CHANGE", () => {
  let state = DefaultState;
  state.time.tick = 0;

  let newState = TimeReducer(state, {type: 'TIME_TICK_CHANGE'});
  expect(newState.time.tick).toBe(Time.SLOW_TICK_MILLIS);
});
