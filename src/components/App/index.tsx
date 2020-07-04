import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Footer, Header } from 'components/Layout';
import { Routes } from 'components/Navigation';
import React, { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import useStyles from './styles';

/**
 * Main application component
 */
const App: FC = () => {
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
