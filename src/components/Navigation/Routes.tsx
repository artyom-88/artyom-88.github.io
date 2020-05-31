import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoadingIndicator } from 'src/components/Navigation';
import { PageContainer } from 'src/components/Pages';

const Main = lazy(() => import('src/components/Pages/Main'));
const About = lazy(() => import('src/components/Pages/About'));
const Blog = lazy(() => import('src/components/Pages/Blog'));
const Career = lazy(() => import('src/components/Pages/Career'));
const Contacts = lazy(() => import('src/components/Pages/Contacts'));
const NotFound = lazy(() => import('src/components/Pages/NotFound'));

const Indicator: FunctionComponent = () => (
  <PageContainer>
    <LoadingIndicator />
  </PageContainer>
);

/**
 * Application routes component
 */
const Routes: FunctionComponent = () => (
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
