import TimeReducer from './TimeReducer.js';
import DefaultState from '../DefaultState.js';
import { Time } from '../../Constants.js';
import { CreateFlightFn, CreateFlightScheduleFn } from '../State.js';

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
      flight: CreateFlightFn("AB", "123", "SFO", "LAX", CreateFlightScheduleFn("AB123", 0, 0)),
      flightCode: "AB123",
      distanceRemainingM: 100,
      speedMps: 250
    }
  ];
  state.time.tick = 100;  // 0.1 second

  let newState = TimeReducer(state, {type: 'TIME_TICK'});
  expect(newState.airplanesInFlight).toHaveLength(1);
  expect(newState.airplanesInFlight[0]).toEqual({
    flight: state.airplanesInFlight[0].flight,
    flightCode: state.airplanesInFlight[0].flightCode,
    distanceRemainingM: 75,
    speedMps: 250
  });

  newState.time.tick = 1000;  // 1 second
  let newerState = TimeReducer(newState, {type: 'TIME_TICK'});
  expect(newerState.airplanesInFlight).toHaveLength(0);
});

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
