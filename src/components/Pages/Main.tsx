import { PageContainer } from 'components/Pages';
import MainPageContent from 'components/Pages/MainPageContent';
import { MAIN } from 'const';
import React, { FC } from 'react';

/**
 * Main page component
 */
const Main: FC = () => (
  <PageContainer Icon={MAIN.Icon}>
    <MainPageContent />
  </PageContainer>
);

export default Main;
