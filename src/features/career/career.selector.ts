import { ListSelectors } from 'common/types/list.types';
import { RootState } from 'common/types/store.types';
import { CareerModel } from './career.types';

export const selectList = ({ career }: RootState): CareerModel[] => career.data.list;

export const isListLoading = ({ career }: RootState): boolean => career.meta.loading;

const selectors: ListSelectors<CareerModel> = {
  isListLoading,
  selectList,
};

export default selectors;
