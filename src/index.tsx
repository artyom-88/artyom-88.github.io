import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from 'components';
import store from 'store';

import registerServiceWorker from './registerServiceWorker';
import 'assets/styles.scss';

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
