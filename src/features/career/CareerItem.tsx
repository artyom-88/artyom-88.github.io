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
  const postRender = <Typography.Text strong>{post}</Typography.Text>;
  const dateRender = (
    <Typography.Text strong>{endDateText ? `${startDateText} - ${endDateText}` : `Since ${startDateText}`}</Typography.Text>
  );
  const descriptionRender = <div>{description}</div>;
  const companyRender = (
    <div>
      {site ? (
        <a href={site} rel={REL} target={BLANK}>
          {title}
        </a>
      ) : (
        title
      )}
    </div>
  );
  const toolsRender = (
    <Space wrap>
      {tools.map((tool) => (
        <Tag key={tool}>{tool}</Tag>
      ))}
    </Space>
  );
  return (
    <Row key={id} gutter={CAREER_ROW_GUTTER} wrap={false}>
      <Col span={4} xs={0} sm={0} md={0} lg={5} xl={4} xxl={4}>
        <Space direction='vertical'>
          {postRender}
          {companyRender}
        </Space>
      </Col>
      <Col span={6} xs={0} sm={0} md={0} lg={9} xl={7} xxl={6}>
        <Space direction='vertical'>
          {dateRender}
          {descriptionRender}
        </Space>
      </Col>
      <Col xs={0} span={14} sm={0} md={0} lg={10} xl={13} xxl={14}>
        {toolsRender}
      </Col>
      <Col span={0} xs={24} sm={24} md={24} lg={0}>
        <Space wrap>
          {companyRender}
          {dateRender}
          {postRender}
          {descriptionRender}
          {toolsRender}
        </Space>
      </Col>
    </Row>
  );
};

export default CareerItem;
