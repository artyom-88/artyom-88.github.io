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
    {children}
  </Card>
);

export default PageContainer;
