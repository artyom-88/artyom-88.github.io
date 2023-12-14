import { JSX } from 'react';

import Space from 'antd/es/space';

import { PageTitleProps } from 'common/components/common-components-types';

const PageTitle = ({ icon: Icon, title }: PageTitleProps): JSX.Element => (
  <Space size='large'>
    <Icon />
    <span className='capitalize'>{title}</span>
  </Space>
);

export default PageTitle;
