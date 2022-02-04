import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Routes from 'app/components/Routes';
import Footer from 'common/components/layout/Footer';
import Header from 'common/components/layout/Header';
import { ReactElement } from 'react';
import { HashRouter } from 'react-router-dom';
import useStyles from './App.styles';
import ErrorBoundary from './ErrorBoundary';

/**
 * Main application component
 */
const App = (): ReactElement => {
  const classes = useStyles();
  const className = `${classes.app} ag-flexbox ag-flexColumn`;
  return (
    <>
      <CssBaseline />
      <div className={className}>
        <HashRouter>
          <Header className={classes.appHeader} />
          <Container className={classes.appContainer} disableGutters fixed>
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
          </Container>
          <Footer className={classes.appFooter} />
        </HashRouter>
      </div>
    </>
  );
};

export default App;
