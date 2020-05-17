import { BLOG_LOAD_LIST_ERROR, BLOG_LOAD_LIST_SUCCESS } from 'src/actions';
import { BlogActionsType, IBlogState, ILoadBlogListSuccessAction } from 'src/types';

const initialState: IBlogState = {
  items: [],
  detail: {},
  error: '',
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
      const { error } = action;
      return { ...state, error };
    }
    default: {
      return state;
    }
  }
};

export default blog;
