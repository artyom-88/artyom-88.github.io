import { createAction } from 'redux-actions';

/**
 * App loading state change action
 */
export const appLoading = createAction('APP_LOADING');

/**
 * App resize state change action
 */
export const appResize = createAction('APP_RESIZE');

/**
 * GitHub contributions update action
 */
export const appContribution = createAction('APP_CONTRIBUTIONS');

/**
 * Load Blog data action
 */
export const blogLoadList = createAction('BLOG_LOAD_LIST');

/**
 * Load Career data action
 */
export const careerLoadList = createAction('CAREER_LOAD_LIST');
