import {
  APP_LOADING,
  AppActionTypes,
  BLOG_LOAD_LIST,
  BLOG_LOAD_LIST_ERROR,
  BLOG_LOAD_LIST_SUCCESS,
  CAREER_LOAD_LIST,
  CAREER_LOAD_LIST_ERROR,
  CAREER_LOAD_LIST_SUCCESS,
  IAppLoadingAction,
} from 'actions';
import { IAppState } from 'types';

export const initialState: IAppState = {
  loading: false,
};

/**
 * App state reducer
 */
const app = (state: IAppState = initialState, action: AppActionTypes): IAppState => {
  switch (action.type) {
    case APP_LOADING: {
      const { loading } = action as IAppLoadingAction;
      return { ...state, loading };
    }
    case BLOG_LOAD_LIST:
    case CAREER_LOAD_LIST: {
      return { ...state, loading: true };
    }
    case BLOG_LOAD_LIST_SUCCESS:
    case BLOG_LOAD_LIST_ERROR:
    case CAREER_LOAD_LIST_SUCCESS:
    case CAREER_LOAD_LIST_ERROR: {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
};

export default app;
