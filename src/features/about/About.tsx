import { ReactElement } from 'react';

import Space from 'antd/es/space';

import PageContainer from 'common/components/PageContainer';
import { ABOUT_PAGE_PROPS } from 'common/constants/pages-constants';
import { useAboutQuery } from 'features/about/hooks/use-about-query';

const About = (): ReactElement => {
  const { data = [], isLoading } = useAboutQuery();
  return (
    <PageContainer isLoading={isLoading} icon={ABOUT_PAGE_PROPS.icon} title='Hi! My name is Artёm.'>
      <Space direction='vertical' size='middle'>
        {data.map((value: string, key: number) => (
          <span key={key}>{value}</span>
        ))}
      </Space>
    </PageContainer>
  );
};

export default About;
