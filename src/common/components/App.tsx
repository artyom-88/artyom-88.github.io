import Container from '@material-ui/core/Container';
import Footer from 'common/components/layout/Footer';
import Header from 'common/components/layout/Header';
import Routes from 'common/components/Routes';
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
  );
};

export default App;
