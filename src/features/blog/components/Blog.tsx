import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import PageContainer from 'common/components/pages/PageContainer';
import { BLANK, REL } from 'common/const/html.const';
import { BLOG_PAGE_META } from 'common/const/pages.const';
import useListItems from 'common/hooks/useListItems';
import { BLOG_DATE_FORMAT } from 'features/blog/blog.constants';
import selectors from 'features/blog/blog.selector';
import { actions } from 'features/blog/blog.slice';
import { BlogModel, BlogState } from 'features/blog/blog.types';
import { ReactElement } from 'react';
import useStyles from './Blog.styles';

const Blog = (): ReactElement => {
  const classes = useStyles();
  const { isLoading, items } = useListItems<BlogState, BlogModel>(actions, selectors);
  return (
    <PageContainer isLoading={isLoading} title={BLOG_PAGE_META.name} Icon={BLOG_PAGE_META.Icon}>
      <div className='ag-flexbox ag-flexColumn'>
        {items.map((item) => {
          const { _id, title, link, linkCaption } = item;
          // TODO: move to separate component
          return (
            <div key={_id} className={classes.blogItem}>
              <Card raised>
                <div className={classes.blogItemContent}>
                  <Typography variant='h5' paragraph className={classes.blogListDate}>
                    {item.date?.format(BLOG_DATE_FORMAT)}
                  </Typography>
                  <Typography variant='h6' paragraph>
                    {title}
                  </Typography>
                  {link && (
                    <div className='ag-flexbox'>
                      <a href={link} target={BLANK} rel={REL} title='Click for details'>
                        <Typography variant='h6' paragraph>
                          {linkCaption}
                        </Typography>
                      </a>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default Blog;
