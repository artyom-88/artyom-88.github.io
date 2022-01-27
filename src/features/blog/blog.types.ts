import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { BaseModel } from 'common/types/common.types';
import { BaseState, ListReducer } from 'common/types/store.types';
import { Moment } from 'moment';

export interface BlogBase extends BaseModel {
  link: string;
  linkCaption: string;
}

export interface BlogDTO extends BlogBase {
  date: string;
}

export interface BlogModel extends BlogBase {
  date: Moment;
}

export interface BlogData {
  list: BlogModel[];
}

export type BlogState = BaseState<BlogData>;

export interface BlogReducers extends ListReducer<BlogState, BlogModel> {
  // empty
}
