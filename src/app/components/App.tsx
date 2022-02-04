import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Routes from 'app/components/Routes';
import Footer from 'common/components/layout/Footer';
import Header from 'common/components/layout/Header';
import { ReactElement } from 'react';
import { HashRouter } from 'react-router-dom';
import useStyles from './App.styles';
import ErrorBoundary from './ErrorBoundary';

const App = (): ReactElement => {
  const classes = useStyles();
  const className = `${classes.app} ag-flexbox ag-flexColumn`;
  return (
    <ErrorBoundary>
      <CssBaseline />
      <div className={className}>
        <HashRouter>
          <Container className={classes.appContent} disableGutters fixed>
            <Header className={classes.appHeader} />
            <Routes />
          </Container>
          <Footer className={classes.appFooter} />
        </HashRouter>
      </div>
    </ErrorBoundary>
  );
};

export default App;
