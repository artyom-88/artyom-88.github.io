import { JSX } from 'react';

import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Space from 'antd/es/space';
import Tooltip from 'antd/es/tooltip';
import Typography from 'antd/es/typography';

import { BLANK, REL } from 'common/constants/html-constants';
import { BlogItemProps } from 'features/blog/blog-types';

const gutter = 16;

const BlogItem = ({ item }: BlogItemProps): JSX.Element => {
  const { _id: id, date, link, linkCaption, title } = item;
  const dateRender = <Typography.Text strong>{date.format('MMMM Do, YYYY')}</Typography.Text>;
  const titleRender = <div>{title}</div>;
  const linkRender = link ? (
    <Tooltip title='Click for details'>
      <a href={link} target={BLANK} rel={REL}>
        <span>{linkCaption}</span>
      </a>
    </Tooltip>
  ) : null;
  return (
    <Row key={id} gutter={gutter} wrap={false}>
      <Col span={6} xs={0} sm={8} md={7} lg={4}>
        {dateRender}
      </Col>
      <Col span={18} xs={0} sm={16} md={17} lg={20}>
        <Space direction='vertical' wrap>
          {titleRender}
          {linkRender}
        </Space>
      </Col>
      <Col span={0} xs={24} sm={0}>
        <Space direction='vertical' wrap>
          {dateRender}
          {titleRender}
          {linkRender}
        </Space>
      </Col>
    </Row>
  );
};

export default BlogItem;
