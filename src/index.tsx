import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import * as reducers from './reducers';
import './index.scss';

const store = createStore(combineReducers(reducers));

/**
 * Site root component
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
