import type { JSX } from 'react';

import Space from 'antd/es/space';
import Tag from 'antd/es/tag';
import Typography from 'antd/es/typography';

import { CareerItemProps } from 'features/career/career-types';

const CareerItem = ({ item }: CareerItemProps): JSX.Element => {
  const { _id: id, post, description, tools } = item;
  const descriptionRender = <div>{description}</div>;
  const postRender = <Typography.Text strong>{post}</Typography.Text>;
  const toolsRender = (
    <Space wrap>
      {tools.map((tool) => (
        <Tag key={tool}>{tool}</Tag>
      ))}
    </Space>
  );
  return (
    <Space data-testid={`career-item-${id}`} direction='vertical'>
      {postRender}
      {descriptionRender}
      {toolsRender}
    </Space>
  );
};

export default CareerItem;
