import { RootState } from 'common/types/store.types';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectCareerList } from './career.selector';
import { careerLoadList } from './career.slice';
import { CareerModel } from './career.types';

export const useCareerItems = (): CareerModel[] => {
  const items = useSelector<RootState, CareerModel[]>(selectCareerList, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(careerLoadList(undefined));
  }, [dispatch]);

  return items;
};
