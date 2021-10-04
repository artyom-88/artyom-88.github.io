import { RootState } from 'common/types/store.types';
import { CareerModel } from './career.types';

export const selectCareerList = ({ career }: RootState): CareerModel[] => career.data.list;

export const isCareerListLoading = ({ career }: RootState): boolean => career.meta.loading;
