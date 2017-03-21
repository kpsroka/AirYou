let MINUTE_IN_MILLIS = 60000;

const DefaultState = createDefaultState();

function createDefaultState() {
  return {
    time: createDefaultTime()
  }
}

function createDefaultTime() {
  return {
    millis: Date.now(),
    tick: MINUTE_IN_MILLIS
  }
}

export default DefaultState;
