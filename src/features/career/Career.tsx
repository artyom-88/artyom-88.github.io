import { ReactElement } from 'react';

import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Typography from 'antd/es/typography';

import PageContainer from 'common/components/PageContainer';
import { CAREER_PAGE_PROPS } from 'common/constants/pages-constants';
import { CAREER_ROW_GUTTER } from 'features/career/career-constants';
import CareerItem from 'features/career/CareerItem';
import { useCareerListQuery } from 'features/career/hooks/use-career-list-query';

const Career = (): ReactElement => {
  const { data: list = [], isLoading } = useCareerListQuery();
  return (
    <PageContainer isLoading={isLoading} title={CAREER_PAGE_PROPS.id} icon={CAREER_PAGE_PROPS.icon}>
      <Row gutter={CAREER_ROW_GUTTER} wrap={false}>
        <Col span={10} xs={0} sm={0} md={0} lg={14} xl={11} xxl={10}>
          <Typography.Title className='mt-0' level={5}>
            Description
          </Typography.Title>
        </Col>
        <Col span={14} xs={0} sm={0} md={0} lg={10} xl={13} xxl={14}>
          <Typography.Title className='mt-0' level={5}>
            Technologies and tools
          </Typography.Title>
        </Col>
      </Row>
      {list.map((item) => (
        <CareerItem item={item} key={item._id} />
      ))}
    </PageContainer>
  );
};

export default Career;
