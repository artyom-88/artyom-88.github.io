import { ContactState } from './contact.types';

export const initialState: ContactState = {
  data: {
    list: [],
  },
  meta: {
    error: '',
    loading: false,
  },
};
