import { createBrowserHistory } from 'history';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { Content, Footer, Header } from 'src/components/Layout';

/**
 * Check if the page is narrow
 */
const isNarrow = (): boolean => window.innerWidth <= 800;

/**
 * Resize hook
 */
const useResize = (): boolean => {
  const [narrow, setNarrow] = useState<boolean>(isNarrow());
  useEffect(() => {
    const onResize = (): void => setNarrow(isNarrow());
    window.addEventListener('resize', onResize);
    return (): void => window.removeEventListener('resize', onResize);
  });
  return narrow;
};

export const NarrowContext = React.createContext(isNarrow());

export const history = createBrowserHistory();

/**
 * Main application component
 */
const App: FunctionComponent = () => (
  <Router history={history}>
    <div className='flexBox flexColumn'>
      <Header />
      <NarrowContext.Provider value={useResize()}>
        <Content />
      </NarrowContext.Provider>
      <Footer />
    </div>
  </Router>
);

export default App;
