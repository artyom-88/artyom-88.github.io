import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import React, { FunctionComponent } from 'react';
import { PageContainer } from 'src/components/Pages';
import { useBlogItems } from 'src/components/Pages/Blog/hooks';
import { BLANK, BLOG, REL } from 'src/const';
import { BlogModel } from 'src/model';
import useStyles from './styles';

const Blog: FunctionComponent = () => {
  const classes = useStyles();
  const items: BlogModel[] = useBlogItems();
  return (
    <PageContainer title={BLOG.name} Icon={BLOG.Icon}>
      <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
        {items.map((item: BlogModel) => {
          const { id, title, link, linkCaption } = item;
          // TODO: move to separate component
          return (
            <Card key={id} className={classes.blogListItem} raised>
              <Typography variant='h5' paragraph className={classes.blogListDate}>
                {item.formatDate()}
              </Typography>
              <Typography variant='h6' paragraph>
                {title}
              </Typography>
              {link && (
                <Box display='flex'>
                  <a href={link} target={BLANK} rel={REL} title='Click for details'>
                    <Typography variant='h6' paragraph>
                      {linkCaption}
                    </Typography>
                  </a>
                </Box>
              )}
            </Card>
          );
        })}
      </Box>
    </PageContainer>
  );
};

export default Blog;
