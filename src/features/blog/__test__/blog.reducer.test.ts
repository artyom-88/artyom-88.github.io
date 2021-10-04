import { PayloadAction } from '@reduxjs/toolkit';
import { BLOG_ITEMS_MOCK } from '__mocks__/blog.mock';
import { ANY_ACTION_MOCK, ERROR_MOCK } from '__mocks__/common.mock';
import blog, { blogLoadList, blogLoadListError, blogLoadListSuccess, initialState } from 'features/blog/blog.slice';
import { BlogModel, BlogState } from 'features/blog/blog.types';

describe('blog reducer', () => {
  it('should return initial state', () => {
    const state: BlogState = blog(undefined, ANY_ACTION_MOCK);
    expect(state).toMatchObject(initialState);
  });

  it('should return correct blog loading state', () => {
    const action: PayloadAction = blogLoadList(undefined);
    const state: BlogState = blog(initialState, action);
    expect(state.meta.loading).toBeTruthy();
  });

  it('should return correct blog load success state', () => {
    const action: PayloadAction<BlogModel[]> = blogLoadListSuccess(BLOG_ITEMS_MOCK);
    const state: BlogState = blog(initialState, action);
    expect(state.data).toMatchObject({ list: BLOG_ITEMS_MOCK });
    expect(state.meta.loading).toBeFalsy();
  });

  it('should return correct blog load error state', () => {
    const action: PayloadAction<string> = blogLoadListError(ERROR_MOCK);
    const state: BlogState = blog(initialState, action);
    expect(state.meta.error).toEqual(ERROR_MOCK);
    expect(state.meta.loading).toBeFalsy();
  });
});
