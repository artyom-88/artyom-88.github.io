import type { JSX } from 'react';

import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Space from 'antd/es/space';
import Tag from 'antd/es/tag';
import Typography from 'antd/es/typography';

import { BLANK, REL } from 'common/constants/html-constants';
import { CAREER_ROW_GUTTER } from 'features/career/career-constants';
import { CareerItemProps } from 'features/career/career-types';

const CareerItem = ({ item }: CareerItemProps): JSX.Element => {
  const { _id: id, site = '', title, post, description, tools, startDate, endDate } = item;
  const startDateText = startDate.format('MMMM Do, YYYY');
  const endDateText = endDate.isValid() ? endDate.format('MMMM Do, YYYY') : '';
  return (
    <Row key={id} gutter={CAREER_ROW_GUTTER} wrap={false}>
      <Col span={4}>
        <Space direction='vertical'>
          <Typography.Text strong>{post}</Typography.Text>
          <div>
            {site ? (
              <a href={site} rel={REL} target={BLANK}>
                {title}
              </a>
            ) : (
              title
            )}
          </div>
        </Space>
      </Col>
      <Col span={6}>
        <Space direction='vertical'>
          <Typography.Text strong>{endDateText ? `${startDateText} - ${endDateText}` : `Since ${startDateText}`}</Typography.Text>
          <div>{description}</div>
        </Space>
      </Col>
      <Col flex='auto'>
        <Space wrap>
          {tools.map((tool) => (
            <Tag key={tool}>{tool}</Tag>
          ))}
        </Space>
      </Col>
    </Row>
  );
};

export default CareerItem;
