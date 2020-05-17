import React, { FunctionComponent, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { blogLoadList } from 'src/actions';
import { BLANK, REL } from 'src/const';
import { PageContainer } from 'src/container';
import { BlogModel } from 'src/model';
import { getBlogListItems } from 'src/selectors';
import { IState } from 'src/types';
import styles from './Blog.module.scss';

const Blog: FunctionComponent = () => {
  const items = useSelector<IState, BlogModel[]>(getBlogListItems, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogLoadList());
  }, [dispatch]);

  return (
    <PageContainer>
      {items.map((item: BlogModel) => {
        const { id, title, link, linkCaption } = item;
        return (
          <div key={id} className={styles.itemContainer}>
            <div className={styles.title}>{item.formatDate()}</div>
            <div className={styles.item}>{title}</div>
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
