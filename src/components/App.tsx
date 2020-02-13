import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import './App.scss';
import Menu from './Navigation/Menu';
import Routes from './Navigation/Routes';

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
            <Routes />
          </div>
          <footer className='components-app__rights'>© 2019 All rights reserved</footer>
        </NarrowContext.Provider>
      </div>
    </HashRouter>
  );
};

export default App;
