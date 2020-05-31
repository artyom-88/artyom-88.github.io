import {
  CAREER_LOAD_LIST_ERROR,
  CAREER_LOAD_LIST_SUCCESS,
  CareerActionsType,
  IErrorAction,
  ILoadCareerListSuccessAction,
} from 'src/actions';
import { ICareerState } from 'src/types';

export const initialState: ICareerState = {
  detail: {},
  error: '',
  items: [],
};

const career = (state: ICareerState = initialState, action: CareerActionsType): ICareerState => {
  switch (action.type) {
    case CAREER_LOAD_LIST_SUCCESS: {
      const { items } = action as ILoadCareerListSuccessAction;
      return { ...state, items };
    }
    case CAREER_LOAD_LIST_ERROR: {
      const { error } = action as IErrorAction;
      return { ...state, error };
    }
    default: {
      return state;
    }
  }
};

export default career;
