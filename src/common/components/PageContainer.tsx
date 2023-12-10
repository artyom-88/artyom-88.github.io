import { JSX, PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';

import { Card, Space } from 'antd';

import { PageContainerProps, PageTitleProps } from 'common/components/common-components-types';
import LoadingPage from 'common/components/LoadingPage';
import { DEFAULT_DESCRIPTION } from 'common/constants/pages-constants';

const PageTitle = ({ icon: Icon, title }: PageTitleProps): JSX.Element => (
  <Space size='large'>
    <Icon />
    <span className='capitalize'>{title}</span>
  </Space>
);

const PageContainer = ({
  icon,
  isLoading,
  children,
  description = DEFAULT_DESCRIPTION,
  title,
}: PropsWithChildren<PageContainerProps>): JSX.Element => (
  <Card className='flex flex-col grow w-full' title={<PageTitle icon={icon} title={title} />}>
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
    {isLoading ? (
      <LoadingPage />
    ) : (
      <Space className='flex flex-col grow' direction='vertical' size='large'>
        {children}
      </Space>
    )}
  </Card>
);

export default PageContainer;
