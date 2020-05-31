import {
  BLOG_LOAD_LIST_ERROR,
  BLOG_LOAD_LIST_SUCCESS,
  BlogActionsType,
  IErrorAction,
  ILoadBlogListSuccessAction,
} from 'src/actions';
import { IBlogState } from 'src/types';

export const initialState: IBlogState = {
  detail: {},
  error: '',
  items: [],
};

/**
 * Blog actions reducer
 */
const blog = (state: IBlogState = initialState, action: BlogActionsType): IBlogState => {
  switch (action.type) {
    case BLOG_LOAD_LIST_SUCCESS: {
      const { items } = action as ILoadBlogListSuccessAction;
      return { ...state, items };
    }
    case BLOG_LOAD_LIST_ERROR: {
      const { error } = action as IErrorAction;
      return { ...state, error };
    }
    default: {
      return state;
    }
  }
};

export default blog;
