import { APP_LOADING, BLOG_LOAD_LIST, CAREER_LOAD_LIST } from 'src/actions';
import { AppActionTypes, IAppState } from 'src/interface';

const initialState: IAppState = {
  loading: false,
};

/**
 * App state reducer
 */
const app = (state: IAppState = initialState, action: AppActionTypes): IAppState => {
  switch (action.type) {
    case APP_LOADING: {
      const { payload } = action;
      return { ...state, loading: payload.loading };
    }
    case BLOG_LOAD_LIST: {
      return { ...state, loading: false };
    }
    case CAREER_LOAD_LIST: {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
};

export default app;
