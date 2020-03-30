import { BLOG_LOAD_LIST } from 'src/actions';
import { BlogActionsType, IBlogState } from 'src/interface';

const initialState: IBlogState = {
  items: {},
  detail: {},
};

/**
 * Blog actions reducer
 */
const blog = (state: IBlogState = initialState, action: BlogActionsType): IBlogState => {
  switch (action.type) {
    case BLOG_LOAD_LIST: {
      const { payload } = action;
      const items = state.items;
      payload.items.forEach((item) => {
        items[item.id] = item;
      });
      return { ...state, items };
    }
    default: {
      return state;
    }
  }
};

export default blog;
