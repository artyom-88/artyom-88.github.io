import LoadingIndicator from 'components/Navigation/LoadingIndicator';
import PageContainer from 'components/Pages/PageContainer';
import { lazy, ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Main = lazy(() => import(/* webpackChunkName: "main-page" */ 'components/Pages/Main'));
const About = lazy(() => import(/* webpackChunkName: "about-page" */ 'components/Pages/About'));
const Blog = lazy(() => import(/* webpackChunkName: "blog-page" */ 'components/Pages/Blog'));
const Career = lazy(() => import(/* webpackChunkName: "career-page" */ 'components/Pages/Career'));
const Contacts = lazy(() => import(/* webpackChunkName: "contacts-page" */ 'components/Pages/Contacts'));
const NotFound = lazy(() => import(/* webpackChunkName: "not-found-page" */ 'components/Pages/NotFound'));

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
