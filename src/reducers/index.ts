import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actions from '../actions';
import { ICareer, ICareerProps } from '../interface/ICareer';
import { IBlog, IBlogProps } from '../interface/IBlog';
import { IAppState } from '../interface/IState';

// fix redux-actions TypeScript bad support
const appLoading = `${actions.appLoading}`;
const appResize = `${actions.appResize}`;
const blogLoadList = `${actions.blogLoadList}`;
const careerLoadList = `${actions.careerLoadList}`;

/**
 * App state reducer
 */
export const app = handleActions<IAppState>({
  [appLoading](state: IAppState, { payload: { loading } }: { payload: { loading: boolean } }) {
    return { ...state, loading };
  },
  [appResize](state: IAppState, { payload: { narrow } }: { payload: { narrow: boolean } }) {
    return { ...state, narrow };
  },
  [blogLoadList](state: IAppState) {
    return { ...state, loading: false };
  },
  [careerLoadList](state: IAppState) {
    return { ...state, loading: false };
  },
}, { narrow: false, loading: false });

/**
 * Blog actions reducer
 */
export const blog = handleActions({
  [blogLoadList](state: IBlogProps, { payload: { items } }: { payload: { items: IBlog[] } }) {
    const newItems = state.items;
    items.forEach((item) => {
      newItems[item.id] = item;
    });
    return { ...state, items: newItems };
  },
}, { items: {}, detail: {} });

/**
 * Career actions reducer
 */
export const career = handleActions({
  [careerLoadList](state: ICareerProps, { payload: { items } }: { payload: { items: ICareer[] } }) {
    const newItems = state.items;
    items.forEach((item) => {
      newItems[item.id] = item;
    });
    return { ...state, items: newItems };
  },
}, { items: {}, detail: {} });


export default combineReducers({ app, blog, career });