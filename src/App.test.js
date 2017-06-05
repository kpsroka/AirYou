import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import AppReducer from './model/reducers/AppReducer.js';
import DefaultState from './model/DefaultState.js';

it('renders without crashing', () => {
  let store = createStore(AppReducer, DefaultState);
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
});
