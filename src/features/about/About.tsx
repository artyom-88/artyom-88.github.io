import { ReactElement } from 'react';

import { Card } from 'antd';
import bio from 'assets/data/bio.json';

import PageContainer from 'common/components/PageContainer';
import { ABOUT_PAGE_META } from 'common/constants/pages-constants';

const TITLE = 'Hi! My name is Artyom.';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IMAGE = 'https://res.cloudinary.com/hia8f154d/image/upload/v1643992397/artyom.jpg';

const About = (): ReactElement => {
  return (
    <PageContainer Icon={ABOUT_PAGE_META.Icon}>
      <Card>
        {TITLE}
        {bio.data.map((value: string, key: number) => (
          <span key={key}>value</span>
        ))}
      </Card>
    </PageContainer>
  );
};

export default About;
