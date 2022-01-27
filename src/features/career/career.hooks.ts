import { RootState } from 'common/types/store.types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isListLoading, selectList } from './career.selector';
import { actions } from './career.slice';
import { CareerModel } from './career.types';

interface UseCareerItems {
  items: CareerModel[];
  isLoading: boolean;
}

export const useCareerItems = (): UseCareerItems => {
  const dispatch = useDispatch();
  const items = useSelector<RootState, CareerModel[]>(selectList);
  const isLoading = useSelector<RootState, boolean>(isListLoading);

  useEffect(() => {
    dispatch(actions.loadList());
    return () => {
      dispatch(actions.clearList());
    };
  }, [dispatch]);

  return { isLoading, items };
};
