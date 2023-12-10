import { ReactElement } from 'react';

import { Space } from 'antd';
import bio from 'assets/data/bio.json';

import PageContainer from 'common/components/PageContainer';
import { ABOUT_PAGE_PROPS } from 'common/constants/pages-constants';

const About = (): ReactElement => (
  <PageContainer icon={ABOUT_PAGE_PROPS.icon} title='Hi! My name is Artёm.'>
    <Space direction='vertical' size='middle'>
      {bio.data.map((value: string, key: number) => (
        <span key={key}>{value}</span>
      ))}
    </Space>
  </PageContainer>
);

export default About;
