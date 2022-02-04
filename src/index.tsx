import ThemeProvider from '@mui/material/styles/ThemeProvider';
import App from 'app/components/App';
import store from 'app/store';
// TODO: use strict mode
// import { StrictMode } from 'react';
import theme from 'app/theme';
import 'assets/styles.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
