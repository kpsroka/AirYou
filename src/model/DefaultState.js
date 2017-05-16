import { Time } from '../Constants.js';

const DefaultState = createDefaultState();

function createDefaultState() {
  return {
    time: createDefaultTime()
  }
}

function createDefaultTime() {
  return {
    millis: Date.now(),
    tick: Time.SLOW_TICK_MILLIS
  }
}

export default DefaultState;
