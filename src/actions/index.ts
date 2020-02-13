import { createAction } from 'redux-actions';

/**
 * App loading state change action
 */
export const appLoading = createAction('APP_LOADING');

/**
 * Load Blog data action
 */
export const blogLoadList = createAction('BLOG_LOAD_LIST');

/**
 * Load Career data action
 */
export const careerLoadList = createAction('CAREER_LOAD_LIST');
