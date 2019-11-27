import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

/**
 * Site root
 */
ReactDOM.render(<App/>, document.getElementById('root') as HTMLElement);
registerServiceWorker();