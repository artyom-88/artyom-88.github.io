import React, { useEffect, useState } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Menu from './Navigation/Menu';
import About from './Page/About';
import Blog from './Page/Blog';
import Career from './Page/Career';
import Contacts from './Page/Contacts';
import Main from './Page/Main';
import NotFound from './Page/NotFound';

/**
 * Check if the page is narrow
 */
const isNarrow = () => window.innerWidth <= 800;

export const NarrowContext = React.createContext(isNarrow());

/**
 * Main application component
 */
const App = () => {
  const [, setNarrow] = useState<boolean>(isNarrow());

  useEffect(() => {
    const onResize = () => setNarrow(isNarrow());
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return (
    <HashRouter>
      <div className='flexBox flexColumn'>
        <NarrowContext.Provider value={isNarrow()}>
          <header className='flexBox'>
            <Menu />
          </header>
          <div className='components-app__background' />
          <div className='flexBox flexColumn components-app__content'>
            <Switch>
              <Redirect from='/main' to='/' />
              <Route exact={true} path='/' component={Main} />
              <Route exact={true} path='/about' component={About} />
              <Route exact={true} path='/blog' component={Blog} />
              <Route exact={true} path='/career' component={Career} />

              <Route exact={true} path='/contacts' component={Contacts} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <footer className='components-app__rights'>© 2019 All rights reserved</footer>
        </NarrowContext.Provider>
      </div>
    </HashRouter>
  );
};

export default App;
