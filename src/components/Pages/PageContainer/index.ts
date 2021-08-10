import { lazy } from 'react';

const PageContainer = lazy(() => import(/* webpackChunkName: "page-container" */ './PageContainer'));

export default PageContainer;
