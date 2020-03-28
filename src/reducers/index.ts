import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from 'src/actions';
import { IBlog, IBlogProps } from 'src/interface/IBlog';
import { ICareer, ICareerProps } from 'src/interface/ICareer';
import { IAppState } from 'src/interface/IState';

// fix redux-actions TypeScript bad support
const appLoading = `${actions.appLoading}`;
const blogLoadList = `${actions.blogLoadList}`;
const careerLoadList = `${actions.careerLoadList}`;

/**
 * App state reducer
 */
export const app = handleActions<IAppState>(
  {
    [appLoading](state: IAppState, { payload: { loading } }: { payload: { loading: boolean } }) {
      return { ...state, loading };
    },
    [blogLoadList](state: IAppState) {
      return { ...state, loading: false };
    },
    [careerLoadList](state: IAppState) {
      return { ...state, loading: false };
    },
  },
  { loading: false }
);

/**
 * Blog actions reducer
 */
export const blog = handleActions(
  {
    [blogLoadList](state: IBlogProps, { payload: { items } }: { payload: { items: IBlog[] } }) {
      const newItems = state.items;
      items.forEach((item) => {
        newItems[item.id] = item;
      });
      return { ...state, items: newItems };
    },
  },
  { items: {}, detail: {} }
);

/**
 * Career actions reducer
 */
export const career = handleActions(
  {
    [careerLoadList](state: ICareerProps, { payload: { items } }: { payload: { items: ICareer[] } }) {
      const newItems = state.items;
      items.forEach((item) => {
        newItems[item.id] = item;
      });
      return { ...state, items: newItems };
    },
  },
  { items: {}, detail: {} }
);

export default combineReducers({ app, blog, career });
