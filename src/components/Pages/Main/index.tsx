import { MainPageContent, PageContainer } from 'components/Pages';
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
