import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { blogLoadList } from 'src/actions';
import { BlogModel } from 'src/model';
import { getBlogListItems } from 'src/selectors';
import { IState } from 'src/types';

export const useBlogItems = (): BlogModel[] => {
  const items = useSelector<IState, BlogModel[]>(getBlogListItems, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogLoadList());
  }, [dispatch]);

  return items;
};
