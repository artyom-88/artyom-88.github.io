import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Footer from 'common/components/layout/Footer';
import Header from 'common/components/layout/Header';
import Routes from 'common/components/Routes';
import { ReactElement } from 'react';
import { HashRouter } from 'react-router-dom';
import useStyles from './App.styles';

/**
 * Main application component
 */
const App = (): ReactElement => {
  const classes = useStyles();
  return (
    <Box className={classes.app} display='flex' flexDirection='column'>
      <HashRouter>
        <Header className={classes.appHeader} />
        <Container className={classes.appContainer} disableGutters fixed>
          <Routes />
        </Container>
        <Footer className={classes.appFooter} />
      </HashRouter>
    </Box>
  );
};

export default App;
