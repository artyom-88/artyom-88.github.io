import { LoadingIndicator } from 'components/Navigation';
import { PageContainer } from 'components/Pages';
import React, { FC, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Main = lazy(() => import('components/Pages/Main'));
const About = lazy(() => import('components/Pages/About'));
const Blog = lazy(() => import('components/Pages/Blog'));
const Career = lazy(() => import('components/Pages/Career'));
const Contacts = lazy(() => import('components/Pages/Contacts'));
const NotFound = lazy(() => import('components/Pages/NotFound'));

const Indicator: FC = () => (
  <PageContainer>
    <LoadingIndicator />
  </PageContainer>
);

/**
 * Application routes component
 */
const Routes: FC = () => (
  <Suspense fallback={<Indicator />}>
    <Switch>
      <Redirect from='/main' to='/' />
      <Route exact={true} path='/' component={Main} />
      <Route exact={true} path='/about' component={About} />
      <Route exact={true} path='/blog' component={Blog} />
      <Route exact={true} path='/career' component={Career} />
      <Route exact={true} path='/contacts' component={Contacts} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
