import { PropsWithChildren, ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

import { Space } from 'antd';

import { PageContainerProps } from 'common/components/common-components-types';
import LoadingPage from 'common/components/LoadingPage';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from 'common/constants/pages-constants';

const PageContainer = ({
  Icon,
  isLoading,
  children,
  description = DEFAULT_DESCRIPTION,
  title = DEFAULT_TITLE,
}: PropsWithChildren<PageContainerProps>): ReactElement => (
  <Space className='flex flex-col h-full w-full' direction='vertical'>
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
    <Space>
      {Icon && <Icon />}
      {title}
    </Space>
    {isLoading ? <LoadingPage /> : children}
  </Space>
);

export default PageContainer;
