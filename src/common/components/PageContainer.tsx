import { JSX, PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';

import { Card, Space } from 'antd';

import { PageContainerProps } from 'common/components/common-components-types';
import { DEFAULT_DESCRIPTION } from 'common/constants/pages-constants';

const PageContainer = ({
  Icon,
  isLoading,
  children,
  description = DEFAULT_DESCRIPTION,
  title,
}: PropsWithChildren<PageContainerProps>): JSX.Element => (
  <Card
    className='flex flex-col grow w-full'
    title={
      <Space size='large'>
        <Icon />
        <span className='capitalize'>{title}</span>
      </Space>
    }
    loading={isLoading}
  >
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
    <Space className='flex flex-col grow' direction='vertical' size='large'>
      {children}
    </Space>
  </Card>
);

export default PageContainer;
