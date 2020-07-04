import { blogLoadList, careerLoadList } from 'actions';
import { BlogModel, CareerModel } from 'model';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getBlogListItems, getCareerListItems } from 'selectors';
import { IState } from 'types';

export const useBlogItems = (): BlogModel[] => {
  const items = useSelector<IState, BlogModel[]>(getBlogListItems, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogLoadList());
  }, [dispatch]);

  return items;
};

export const useCareerItems = (): CareerModel[] => {
  const items = useSelector<IState, CareerModel[]>(getCareerListItems, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(careerLoadList());
  }, [dispatch]);

  return items;
};
