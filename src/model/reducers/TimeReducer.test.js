import TimeReducer from './TimeReducer.js';
import DefaultState from '../DefaultState.js';
import { Time } from '../../Constants.js';

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
