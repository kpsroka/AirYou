import TimeReducer from './TimeReducer.js';
import DefaultState from '../DefaultState.js';

it("TimeReducer updates time according to tick on TIME_TICK", () => {
  let timeTickAction = {
    type: 'TIME_TICK'
  }


  let state = DefaultState;
  state.time.millis = 100000;
  state.time.tick = 420;

  let newState = TimeReducer(state, timeTickAction);

  expect(newState.time.millis).toBe(state.time.millis + state.time.tick);
});
