import type { JSX } from 'react';
import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ErrorBoundary from 'common/components/ErrorBoundary';
import Routes from 'common/routes/Routes';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { retry: 0 },
    queries: {
      refetchOnWindowFocus: false,
      retry: 5,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = (): JSX.Element => (
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <HashRouter>
            <Routes />
          </HashRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);

export default App;
