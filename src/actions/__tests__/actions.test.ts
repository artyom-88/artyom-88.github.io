import { BLOG_ITEMS_MOCK, CAREER_ITEMS_MOCK } from 'src/__mocks__';
import {
  APP_LOADING,
  appLoading,
  BLOG_LOAD_LIST,
  BLOG_LOAD_LIST_ERROR,
  BLOG_LOAD_LIST_SUCCESS,
  blogLoadList,
  blogLoadListError,
  blogLoadListSuccess,
  CAREER_LOAD_LIST,
  CAREER_LOAD_LIST_ERROR,
  CAREER_LOAD_LIST_SUCCESS,
  careerLoadList,
  careerLoadListError,
  careerLoadListSuccess,
  IErrorAction,
  ILoadBlogListSuccessAction,
  ILoadCareerListSuccessAction,
} from 'src/actions';

describe('actions', () => {
  describe('app', () => {
    const type = APP_LOADING;

    it('should return action with loading true', () => {
      const loading = true;
      expect(appLoading(loading)).toMatchObject({ type, loading });
    });

    it('should return action with loading false', () => {
      const loading = false;
      expect(appLoading(loading)).toMatchObject({ type, loading });
    });
  });

  describe('blog', () => {
    it('should return load list action', () => {
      expect(blogLoadList()).toMatchObject({ type: BLOG_LOAD_LIST });
    });

    it('should return load list success action', () => {
      const action: ILoadBlogListSuccessAction = blogLoadListSuccess(BLOG_ITEMS_MOCK);
      expect(action).toMatchObject({
        type: BLOG_LOAD_LIST_SUCCESS,
        items: BLOG_ITEMS_MOCK,
      });
    });

    it('should return load list error action', () => {
      const error = 'error';
      const action: IErrorAction = blogLoadListError(error);
      expect(action).toMatchObject({
        type: BLOG_LOAD_LIST_ERROR,
        error,
      });
    });
  });

  describe('career', () => {
    it('should return load list action', () => {
      expect(careerLoadList()).toMatchObject({ type: CAREER_LOAD_LIST });
    });

    it('should return load list success action', () => {
      const action: ILoadCareerListSuccessAction = careerLoadListSuccess(CAREER_ITEMS_MOCK);
      expect(action).toMatchObject({
        type: CAREER_LOAD_LIST_SUCCESS,
        items: CAREER_ITEMS_MOCK,
      });
    });

    it('should return load list error action', () => {
      const error = 'error';
      const action: IErrorAction = careerLoadListError(error);
      expect(action).toMatchObject({
        type: CAREER_LOAD_LIST_ERROR,
        error,
      });
    });
  });
});
