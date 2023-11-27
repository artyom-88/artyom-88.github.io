import type { JSX } from 'react';
import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';

import LoadingPage from 'common/components/LoadingPage';
import NotFound from 'common/components/NotFound';
import PageLayout from 'common/components/PageLayout';
import * as routesConstants from 'common/routes/routes-constants';

const About = lazy(() => import('features/about/About'));
const Blog = lazy(() => import('features/blog/Blog'));
const Career = lazy(() => import('features/career/Career'));

const loadingPage = <LoadingPage />;

const routesConfig: RouteObject[] = [
  {
    element: <PageLayout />,
    path: routesConstants.ROOT_URL,
    children: [
      {
        element: <About />,
        index: true,
      },
      {
        element: <Navigate to={routesConstants.ROOT_URL} />,
        path: routesConstants.ABOUT_URL,
      },
      {
        element: <Blog />,
        path: routesConstants.BLOG_URL,
      },
      {
        element: <Career />,
        path: routesConstants.CAREER_URL,
      },
      {
        element: <NotFound />,
        path: '*',
      },
    ],
  },
];

const Routes = (): JSX.Element => {
  const routes = useRoutes(routesConfig);
  return <Suspense fallback={loadingPage}>{routes}</Suspense>;
};

export default Routes;
