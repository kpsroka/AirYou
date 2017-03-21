const DefaultState = createDefaultState();

function createDefaultState() {
  return {
    time: createDefaultTime()
  }
}

function createDefaultTime() {
  return {
    millis: Date.now(),
    tick: 60000
  }
}

export default DefaultState;
