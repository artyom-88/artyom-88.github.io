import PageContainer from 'common/components/PageContainer';
import { BLOG_PAGE_PROPS } from 'common/constants/pages-constants';
import BlogItem from 'features/blog/BlogItem';
import { useBlogListQuery } from 'features/blog/hooks/use-blog-list-query';
import type { JSX } from 'react';

const Blog = (): JSX.Element => {
  const { data: list = [], isLoading } = useBlogListQuery();
  return (
    <PageContainer isLoading={isLoading} title={BLOG_PAGE_PROPS.id} icon={BLOG_PAGE_PROPS.icon}>
      {list.map((item) => (
        <BlogItem item={item} key={item._id} />
      ))}
    </PageContainer>
  );
};

export default Blog;
