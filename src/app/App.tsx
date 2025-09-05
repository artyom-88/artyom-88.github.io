import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AntdApp from 'antd/es/app';
import ErrorBoundary from 'common/components/ErrorBoundary';
import PageLayout from 'common/components/PageLayout';
import Routes from 'common/routes/Routes';
import type { JSX } from 'react';
import { StrictMode } from 'react';
import { HashRouter } from 'react-router-dom';

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
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <AntdApp>
            <PageLayout>
              <Routes />
            </PageLayout>
          </AntdApp>
        </HashRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);

export default App;
