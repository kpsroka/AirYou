let MINUTE_IN_MILLIS = 60000;
let SLOW_TICK = MINUTE_IN_MILLIS / 4;

const DefaultState = createDefaultState();

function createDefaultState() {
  return {
    time: createDefaultTime()
  }
}

function createDefaultTime() {
  return {
    millis: Date.now(),
    tick: SLOW_TICK
  }
}

export default DefaultState;
