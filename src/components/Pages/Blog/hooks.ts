import { blogLoadList } from 'actions';
import { BlogModel } from 'model';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getBlogListItems } from 'selectors';
import { IState } from 'types';

export const useBlogItems = (): BlogModel[] => {
  const items = useSelector<IState, BlogModel[]>(getBlogListItems, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogLoadList());
  }, [dispatch]);

  return items;
};
