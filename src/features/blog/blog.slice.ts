import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { BlogModel, BlogState } from './blog.types';

export const initialState: BlogState = {
  data: {
    list: [],
  },
  meta: {
    error: '',
    loading: false,
  },
};

const { actions, reducer } = createSlice<BlogState, SliceCaseReducers<BlogState>>({
  name: 'blog',
  initialState,
  reducers: {
    blogLoadList(state: BlogState) {
      state.meta.loading = true;
    },
    blogLoadListSuccess(state, { payload }: PayloadAction<BlogModel[]>) {
      state.data.list = payload;
      state.meta.loading = false;
    },
    blogLoadListError(state, { payload }: PayloadAction<string>) {
      state.meta.error = payload;
      state.meta.loading = false;
    },
  },
});

export const { blogLoadList, blogLoadListSuccess, blogLoadListError } = actions;

export default reducer;
