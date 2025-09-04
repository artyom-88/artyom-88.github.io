import Space from 'antd/es/space';
import type { PageTitleProps } from 'common/components/common-components-types';
import type { JSX } from 'react';

const PageTitle = ({ icon: Icon, title }: PageTitleProps): JSX.Element => (
  <Space size='large'>
    <Icon />
    <h1 className='capitalize'>{title}</h1>
  </Space>
);

export default PageTitle;
