import React, { FunctionComponent, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { blogLoadList } from 'src/actions';
import { PageContainer } from 'src/components/Pages';
import { BLANK, REL } from 'src/const';
import { BlogModel } from 'src/model';
import { getBlogListItems } from 'src/selectors';
import { IState } from 'src/types';
import useStyles from './styles';

const useBlogItems = (): BlogModel[] => {
  const items = useSelector<IState, BlogModel[]>(getBlogListItems, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogLoadList());
  }, [dispatch]);

  return items;
};

const Blog: FunctionComponent = () => {
  const classes = useStyles();
  const items: BlogModel[] = useBlogItems();
  return (
    <PageContainer title='Blog'>
      {items.map((item: BlogModel) => {
        const { id, title, link, linkCaption } = item;
        return (
          <div key={id} className={classes.blogListItem}>
            <div className=''>{item.formatDate()}</div>
            <div className=''>{title}</div>
            {link && (
              <a href={link} target={BLANK} rel={REL} title='Click for details'>
                {linkCaption}
              </a>
            )}
          </div>
        );
      })}
    </PageContainer>
  );
};

export default Blog;
