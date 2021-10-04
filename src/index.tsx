import 'assets/styles.css';
import store from 'app/store';
import App from 'common/components/App';
// TODO: use strict mode
// import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

/**
 * Site root component
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
