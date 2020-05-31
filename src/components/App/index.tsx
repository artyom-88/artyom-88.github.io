import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import React, { FunctionComponent } from 'react';
import { HashRouter } from 'react-router-dom';
import { Footer, Header } from 'src/components/Layout';
import { Routes } from 'src/components/Navigation';
import useStyles from './styles';

/**
 * Main application component
 */
const App: FunctionComponent = () => {
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
