import LoadingIndicator from 'common/components/layout/LoadingIndicator';
import PageContainer from 'common/components/pages/PageContainer';
import { lazy, ReactElement, Suspense } from 'react';
import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';

const About = lazy(() => import(/* webpackChunkName: "about-page" */ 'common/components/pages/About'));
const Blog = lazy(() => import(/* webpackChunkName: "blog-page" */ 'features/blog/components/Blog'));
const Career = lazy(() => import(/* webpackChunkName: "career-page" */ 'features/career/components/Career'));
const Contacts = lazy(() => import(/* webpackChunkName: "contact-page" */ 'features/contact/components/Contacts'));
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
    <ReactRoutes>
      <Route path='/about' element={<Navigate to='/' />} />
      <Route path='/' element={<About />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/career' element={<Career />} />
      <Route path='/contacts' element={<Contacts />} />
      <Route element={<NotFound />} />
    </ReactRoutes>
  </Suspense>
);

export default Routes;
