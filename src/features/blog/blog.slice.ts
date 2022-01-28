import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './blog.constants';
import { BlogReducers, BlogState } from './blog.types';

const blogSlice = createSlice<BlogState, BlogReducers>({
  name: 'blog',
  initialState,
  reducers: {
    loadList(state: BlogState) {
      state.meta.loading = true;
    },
    loadListSuccess(state, { payload }) {
      state.data.list = payload;
      state.meta.loading = false;
    },
    loadListError(state, { payload }) {
      state.meta.error = payload;
      state.meta.loading = false;
    },
    clearList(state) {
      state.data.list = [];
    },
  },
});

export const { actions } = blogSlice;

export default blogSlice.reducer;
