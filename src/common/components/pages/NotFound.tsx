import Typography from '@mui/material/Typography';
import PageContainer from 'common/components/pages/PageContainer';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const TITLE = 'Page Not Found';

const NotFound = (): ReactElement => (
  <PageContainer title={TITLE}>
    <Typography paragraph variant='h4'>
      <Link to='/'>Go to main page</Link>
    </Typography>
  </PageContainer>
);

export default NotFound;
