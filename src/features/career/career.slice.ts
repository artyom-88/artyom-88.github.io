import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { CareerModel, CareerState } from './career.types';

export const initialState: CareerState = {
  data: {
    list: [],
  },
  meta: {
    error: '',
    loading: false,
  },
};

const { actions, reducer } = createSlice<CareerState, SliceCaseReducers<CareerState>>({
  name: 'blog',
  initialState,
  reducers: {
    careerLoadList(state: CareerState) {
      state.meta.loading = true;
    },
    careerLoadListSuccess(state, { payload }: PayloadAction<CareerModel[]>) {
      state.data.list = payload;
      state.meta.loading = false;
    },
    careerLoadListError(state, { payload }: PayloadAction<string>) {
      state.meta.error = payload;
      state.meta.loading = false;
    },
  },
});

export const { careerLoadList, careerLoadListSuccess, careerLoadListError } = actions;

export default reducer;
