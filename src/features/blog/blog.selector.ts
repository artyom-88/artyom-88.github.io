import { ListSelectors } from 'common/types/list.types';
import { RootState } from 'common/types/store.types';
import { BlogModel } from './blog.types';

export const selectList = ({ blog }: RootState): BlogModel[] => blog.data.list;

export const isListLoading = ({ blog }: RootState): boolean => blog.meta.loading;

const selectors: ListSelectors<BlogModel> = {
  isListLoading,
  selectList,
};

export default selectors;
