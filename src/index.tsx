import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './components/Store';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

/**
 * Site root
 */
ReactDOM.render((
    <Provider store={ store }>
        <App/>
    </Provider>
), document.getElementById('root') as HTMLElement);
registerServiceWorker();