import MainPageContent from 'common/components/pages/MainPageContent';
import PageContainer from 'common/components/pages/PageContainer';
import { MAIN_PAGE_META } from 'common/const/pages.const';
import { ReactElement } from 'react';

/**
 * Main page component
 */
const Main = (): ReactElement => (
  <PageContainer Icon={MAIN_PAGE_META.Icon}>
    <MainPageContent />
  </PageContainer>
);

export default Main;
