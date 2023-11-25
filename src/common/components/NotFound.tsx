import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { WarningOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import PageContainer from 'common/components/PageContainer';
import { ROOT_URL } from 'common/routes/routes-constants';

const TITLE = 'Page Not Found';

const NotFound = (): ReactElement => (
  <PageContainer title={TITLE} Icon={WarningOutlined}>
    <Typography.Title>
      <Link to={ROOT_URL}>Go to main page</Link>
    </Typography.Title>
  </PageContainer>
);

export default NotFound;
