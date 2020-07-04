import Typography from '@material-ui/core/Typography';
import { PageContainer } from 'components/Pages';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const TITLE = 'Page Not Found';

/**
 * 404 page not component
 */
const NotFound: FC = () => {
  return (
    <PageContainer title={TITLE}>
      <Typography paragraph variant='h4'>
        <Link to='/'>Go to main page</Link>
      </Typography>
    </PageContainer>
  );
};

export default NotFound;
