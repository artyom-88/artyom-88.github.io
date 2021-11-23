import { RootState } from 'common/types/store.types';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectBlogList } from './blog.selector';
import { blogLoadList } from './blog.slice';
import { BlogModel } from './blog.types';

export const useBlogItems = (): BlogModel[] => {
  const items = useSelector<RootState, BlogModel[]>(selectBlogList, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogLoadList(undefined));
  }, [dispatch]);

  return items;
};
