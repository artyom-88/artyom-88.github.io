import { CAREER_LOAD_LIST_ERROR, CAREER_LOAD_LIST_SUCCESS } from 'src/actions';
import { CareerActionsType, ICareerState, ILoadCareerListSuccessAction } from 'src/types';

const initialState: ICareerState = {
  items: [],
  detail: {},
  error: '',
};

const career = (state: ICareerState = initialState, action: CareerActionsType): ICareerState => {
  switch (action.type) {
    case CAREER_LOAD_LIST_SUCCESS: {
      const { items } = action as ILoadCareerListSuccessAction;
      return { ...state, items };
    }
    case CAREER_LOAD_LIST_ERROR: {
      const { error } = action;
      return { ...state, error };
    }
    default: {
      return state;
    }
  }
};

export default career;
