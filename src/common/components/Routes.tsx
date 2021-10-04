import LoadingIndicator from 'common/components/layout/LoadingIndicator';
import PageContainer from 'common/components/pages/PageContainer';
import { lazy, ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Main = lazy(() => import(/* webpackChunkName: "main-page" */ 'common/components/pages/Main'));
const About = lazy(() => import(/* webpackChunkName: "about-page" */ 'common/components/pages/About'));
const Blog = lazy(() => import(/* webpackChunkName: "blog-page" */ 'features/blog/components/Blog'));
const Career = lazy(() => import(/* webpackChunkName: "career-page" */ 'features/career/components/Career'));
const Contacts = lazy(() => import(/* webpackChunkName: "contacts-page" */ 'common/components/pages/Contacts'));
const NotFound = lazy(() => import(/* webpackChunkName: "not-found-page" */ 'common/components/pages/NotFound'));

const Indicator = (): ReactElement => (
  <PageContainer>
    <LoadingIndicator />
  </PageContainer>
);

/**
 * Application routes component
 */
const Routes = (): ReactElement => (
  <Suspense fallback={<Indicator />}>
    <Switch>
      <Redirect from='/main' to='/' />
      <Route exact path='/' component={Main} />
      <Route exact path='/about' component={About} />
      <Route exact path='/blog' component={Blog} />
      <Route exact path='/career' component={Career} />
      <Route exact path='/contacts' component={Contacts} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
