import { ReactElement } from 'react';

import { Col, Row, Space, Tooltip, Typography } from 'antd';

import PageContainer from 'common/components/PageContainer';
import { BLANK, REL } from 'common/constants/html-constants';
import { BLOG_PAGE_PROPS } from 'common/constants/pages-constants';
import { useBlogListQuery } from 'features/blog/hooks/use-blog-list-query';

const gutter = 16;

const Blog = (): ReactElement => {
  const { data: list = [], isLoading } = useBlogListQuery();
  return (
    <PageContainer isLoading={isLoading} title={BLOG_PAGE_PROPS.id} icon={BLOG_PAGE_PROPS.icon}>
      {list.map((item) => {
        const { _id: id, title, link, linkCaption } = item;
        return (
          <Row key={id} gutter={gutter} wrap={false}>
            <Col span={4}>
              <Typography.Text strong>{item.date.format('MMMM Do, YYYY')}</Typography.Text>
            </Col>
            <Col flex='auto'>
              <Space direction='vertical' wrap>
                <div>{title}</div>
                {link && (
                  <Tooltip title='Click for details'>
                    <a href={link} target={BLANK} rel={REL}>
                      <span>{linkCaption}</span>
                    </a>
                  </Tooltip>
                )}
              </Space>
            </Col>
          </Row>
        );
      })}
    </PageContainer>
  );
};

export default Blog;
