import { ListSelectors } from 'common/types/list.types';
import { RootState } from 'common/types/store.types';
import { ContactModel } from './contact.types';

export const selectList = ({ contact }: RootState): ContactModel[] => contact.data.list;

export const isListLoading = ({ contact }: RootState): boolean => contact.meta.loading;

const selectors: ListSelectors<ContactModel> = {
  selectList,
  isListLoading,
};

export default selectors;
