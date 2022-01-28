import { CareerState } from './career.types';

export const initialState: CareerState = {
  data: {
    list: [],
  },
  meta: {
    error: '',
    loading: false,
  },
};
