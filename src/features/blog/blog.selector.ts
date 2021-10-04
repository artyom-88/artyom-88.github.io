import { RootState } from 'common/types/store.types';
import { BlogModel } from './blog.types';

export const selectBlogList = ({ blog }: RootState): BlogModel[] => blog.data.list;
