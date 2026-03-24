import WarningOutlined from '@ant-design/icons/WarningOutlined';
import Typography from 'antd/es/typography';
import PageContainer from 'common/components/PageContainer';
import { ROOT_URL } from 'common/routes/routes-constants';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';

const NotFound = (): JSX.Element => (
  <PageContainer title='Page Not Found' icon={WarningOutlined}>
    <Typography.Title>
      <Link to={ROOT_URL}>Go to main page</Link>
    </Typography.Title>
  </PageContainer>
);

export default NotFound;
