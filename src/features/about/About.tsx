import { ReactElement } from 'react';

import { Space } from 'antd';
import bio from 'assets/data/bio.json';

import PageContainer from 'common/components/PageContainer';
import { ABOUT_PAGE_PROPS } from 'common/constants/pages-constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IMAGE = 'https://res.cloudinary.com/hia8f154d/image/upload/v1643992397/artyom.jpg';

const About = (): ReactElement => (
  <PageContainer Icon={ABOUT_PAGE_PROPS.Icon} title='Hi! My name is Artёm.'>
    <Space direction='vertical'>
      {bio.data.map((value: string, key: number) => (
        <span key={key}>{value}</span>
      ))}
    </Space>
  </PageContainer>
);

export default About;
