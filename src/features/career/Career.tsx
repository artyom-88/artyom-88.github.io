import Timeline, { type TimelineItemProps } from 'antd/es/timeline';
import PageContainer from 'common/components/PageContainer';
import { CAREER_PAGE_PROPS } from 'common/constants/pages-constants';
import CareerItem from 'features/career/CareerItem';
import CareerItemTitle from 'features/career/CareerItemTitle';
import { useCareerListQuery } from 'features/career/hooks/use-career-list-query';
import { type ReactElement, useMemo } from 'react';

const Career = (): ReactElement => {
  const { data: list = [], isLoading } = useCareerListQuery();
  const timelineItems = useMemo<TimelineItemProps[]>(
    () =>
      list.map((item, index) => ({
        children: <CareerItem item={item} />,
        color: index ? 'blue' : 'green',
        label: <CareerItemTitle item={item} />,
      })),
    [list],
  );
  return (
    <PageContainer isLoading={isLoading} title={CAREER_PAGE_PROPS.id} icon={CAREER_PAGE_PROPS.icon}>
      <Timeline items={timelineItems} mode='left' />
    </PageContainer>
  );
};

export default Career;
