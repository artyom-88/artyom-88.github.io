import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Content from './Layout/Content';
import Footer from './Layout/Footer';
import Header from './Layout/Header';

/**
 * Check if the page is narrow
 */
const isNarrow = () => window.innerWidth <= 800;

/**
 * Resize hook
 */
const useResize = () => {
  const [narrow, setNarrow] = useState<boolean>(isNarrow());
  useEffect(() => {
    const onResize = () => setNarrow(isNarrow());
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });
  return narrow;
};

export const NarrowContext = React.createContext(isNarrow());

/**
 * Main application component
 */
const App = () => (
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
