import { lazy } from 'react';

const LoadingIndicator = lazy(() => import(/* webpackChunkName: "loading-indicator" */ './LoadingIndicator'));

export default LoadingIndicator;
