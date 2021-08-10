import MainPageContent from 'components/Pages/MainPageContent';
import PageContainer from 'components/Pages/PageContainer';
import { MAIN } from 'const';
import { ReactElement } from 'react';

/**
 * Main page component
 */
const Main = (): ReactElement => (
  <PageContainer Icon={MAIN.Icon}>
    <MainPageContent />
  </PageContainer>
);

export default Main;
