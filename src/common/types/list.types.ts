import { CaseReducerActions } from '@reduxjs/toolkit/src/createSlice';
import { ListReducer, RootState } from './store.types';

export interface ListSelectors<TModel> {
  isListLoading: (state: RootState) => boolean;
  selectList: (state: RootState) => TModel[];
}

export interface ListData<TModel> {
  items: TModel[];
  isLoading: boolean;
}

export type ListActions<TState, TModel> = CaseReducerActions<ListReducer<TState, TModel>>;
