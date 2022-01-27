import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './contact.constants';
import { ContactReducers, ContactState } from './contact.types';

const slice = createSlice<ContactState, ContactReducers>({
  name: 'contact',
  initialState,
  reducers: {
    loadList(state: ContactState) {
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

export const { actions } = slice;

export default slice.reducer;
