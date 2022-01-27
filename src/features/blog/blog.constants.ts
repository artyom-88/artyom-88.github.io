import { BlogState } from './blog.types';

export const BLOG_DATE_FORMAT = 'Do MMMM YYYY';

export const initialState: BlogState = {
  data: {
    list: [],
  },
  meta: {
    error: '',
    loading: false,
  },
};
