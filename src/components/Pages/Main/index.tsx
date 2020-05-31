import React, { FunctionComponent } from 'react';
import { MainPageContent, PageContainer } from 'src/components/Pages';
import { MAIN } from 'src/const';

/**
 * Main page component
 */
const Main: FunctionComponent = () => (
  <PageContainer Icon={MAIN.Icon}>
    <MainPageContent />
  </PageContainer>
);

export default Main;
