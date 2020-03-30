import { IAppLoading, ILoadBlogList, ILoadCareerList } from 'src/interface';
import { BlogModel, CareerModel } from 'src/model';

export const APP_LOADING = 'APP_LOADING';
export const BLOG_LOAD_LIST = 'BLOG_LOAD_LIST';
export const CAREER_LOAD_LIST = 'CAREER_LOAD_LIST';

/**
 * App loading state change action
 */
export const appLoading = (loading: boolean): IAppLoading => ({
  type: APP_LOADING,
  payload: { loading },
});

/**
 * Load Blog data action
 */
export const blogLoadList = (items: BlogModel[]): ILoadBlogList => ({
  type: BLOG_LOAD_LIST,
  payload: { items },
});

/**
 * Load Career data action
 */
export const careerLoadList = (items: CareerModel[]): ILoadCareerList => ({
  type: CAREER_LOAD_LIST,
  payload: { items },
});
