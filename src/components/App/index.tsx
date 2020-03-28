import React, { FunctionComponent, useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';

import { Content, Header, Footer } from 'src/components/Layout';

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

/**
 * Main application component
 */
const App: FunctionComponent = () => (
  <HashRouter>
    <div className='flexBox flexColumn'>
      <Header />
      <NarrowContext.Provider value={useResize()}>
        <Content />
      </NarrowContext.Provider>
      <Footer />
    </div>
  </HashRouter>
);

export default App;
