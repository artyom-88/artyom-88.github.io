import { CaseReducer, PayloadAction, Reducer, SliceCaseReducers } from '@reduxjs/toolkit';
import { BlogState } from 'features/blog/blog.types';
import { CareerState } from 'features/career/career.types';

export interface RootReducer {
  blog: Reducer<BlogState>;
  career: Reducer<CareerState>;
}

export interface RootState {
  blog: BlogState;
  career: CareerState;
}

export interface ListReducer<TState, TModel> extends SliceCaseReducers<TState> {
  loadList: CaseReducer<TState, PayloadAction<undefined>>;
  loadListSuccess: CaseReducer<TState, PayloadAction<TModel[]>>;
  loadListError: CaseReducer<TState, PayloadAction<string>>;
  clearList: CaseReducer<TState, PayloadAction<undefined>>;
}

export type BaseData = Record<string, unknown>;

export interface BaseMeta {
  error: string;
  loading: boolean;
}

export interface BaseState<TData = BaseData, TMeta = BaseMeta> {
  data: TData;
  meta: TMeta;
}
