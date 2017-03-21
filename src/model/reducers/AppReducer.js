import TimeReducer from './TimeReducer.js';

const AppReducer = (state, action={}) => {
  return Object.assign(
    {}, state,
    { time: TimeReducer(state.time, action) })
}

export default AppReducer;
