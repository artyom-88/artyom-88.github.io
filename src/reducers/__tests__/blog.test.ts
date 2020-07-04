import { ANY_ACTION_MOCK, BLOG_ITEMS_MOCK, ERROR_MOCK } from '__mocks__';
import {
  blogLoadList,
  blogLoadListError,
  blogLoadListSuccess,
  IErrorAction,
  ILoadBlogListSuccessAction,
} from 'actions';
import blog, { initialState } from 'reducers/blog';
import { AnyAction } from 'redux';
import { IBlogState } from 'types';

describe('reducers', () => {
  describe('blog', () => {
    it('should return initial state', () => {
      const state: IBlogState = blog(undefined, ANY_ACTION_MOCK);
      expect(state).toMatchObject(initialState);
    });

    it('should return correct blog loading state', () => {
      const action: AnyAction = blogLoadList();
      const state: IBlogState = blog(initialState, action);
      expect(state).toMatchObject(initialState);
    });

    it('should return correct blog load success state', () => {
      const action: ILoadBlogListSuccessAction = blogLoadListSuccess(BLOG_ITEMS_MOCK);
      const state: IBlogState = blog(initialState, action);
      expect(state).toMatchObject({
        ...initialState,
        items: BLOG_ITEMS_MOCK,
      });
    });

    it('should return correct blog load error state', () => {
      const action: IErrorAction = blogLoadListError(ERROR_MOCK);
      const state: IBlogState = blog(initialState, action);
      expect(state.error).toEqual(ERROR_MOCK);
    });
  });
});
