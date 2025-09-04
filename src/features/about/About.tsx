import Space from 'antd/es/space';
import PageContainer from 'common/components/PageContainer';
import { ABOUT_PAGE_PROPS } from 'common/constants/pages-constants';
import { useAboutQuery } from 'features/about/hooks/use-about-query';
import type { ReactElement } from 'react';

const About = (): ReactElement => {
  const { data = [], isLoading } = useAboutQuery();
  return (
    <PageContainer isLoading={isLoading} icon={ABOUT_PAGE_PROPS.icon} title='Hi! My name is Artёm.'>
      <Space direction='vertical' size='middle'>
        {data.map((value: string) => (
          <span key={value}>{value}</span>
        ))}
      </Space>
    </PageContainer>
  );
};

export default About;
