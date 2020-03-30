import { CAREER_LOAD_LIST } from 'src/actions';
import { CareerActionsType, ICareerState } from 'src/interface';

const initialState: ICareerState = {
  items: {},
  detail: {},
};

/**
 * Career actions reducer
 */
const career = (state: ICareerState = initialState, action: CareerActionsType): ICareerState => {
  switch (action.type) {
    case CAREER_LOAD_LIST: {
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

export default career;
