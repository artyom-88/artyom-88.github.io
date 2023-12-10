import { ReactElement } from 'react';

import { Col, Row, Space, Tag, Typography } from 'antd';

import PageContainer from 'common/components/PageContainer';
import { BLANK, REL } from 'common/constants/html-constants';
import { CAREER_PAGE_PROPS } from 'common/constants/pages-constants';
import { useCareerListQuery } from 'features/career/hooks/use-career-list-query';

const gutter = 16;

const Career = (): ReactElement => {
  const { data: list = [], isLoading } = useCareerListQuery();
  return (
    <PageContainer isLoading={isLoading} title={CAREER_PAGE_PROPS.id} icon={CAREER_PAGE_PROPS.icon}>
      <Row gutter={gutter} wrap={false}>
        <Col span={10}>
          <Typography.Title className='mt-0' level={5}>
            Description
          </Typography.Title>
        </Col>
        <Col flex='auto'>
          <Typography.Title className='mt-0' level={5}>
            Technologies and tools
          </Typography.Title>
        </Col>
      </Row>
      {list.map((item) => {
        const { _id: id, site = '', title, post, description, tools, startDate, endDate } = item;
        const startDateText = startDate.format('MMMM Do, YYYY');
        const endDateText = endDate.isValid() ? endDate.format('MMMM Do, YYYY') : '';
        return (
          <Row key={id} gutter={gutter} wrap={false}>
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
                <Typography.Text strong>
                  {endDateText ? `${startDateText} - ${endDateText}` : `Since ${startDateText}`}
                </Typography.Text>
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
      })}
    </PageContainer>
  );
};

export default Career;
