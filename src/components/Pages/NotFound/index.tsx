import Typography from '@material-ui/core/Typography';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from 'src/components/Pages';

const TITLE = 'Page Not Found';

/**
 * 404 page not component
 */
const NotFound: FunctionComponent = () => {
  return (
    <PageContainer title={TITLE}>
      <Typography paragraph variant='h4'>
        <Link to='/'>Go to main page</Link>
      </Typography>
    </PageContainer>
  );
};

export default NotFound;
