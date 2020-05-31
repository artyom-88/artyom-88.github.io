import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from 'src/components/Pages';
import styles from './NotFound.module.scss';

const TITLE = 'Page Not Found';

/**
 * 404 page not component
 */
const NotFound: FunctionComponent = () => (
  <PageContainer title={TITLE}>
    <div className={styles.container}>
      <Link to='/'>Go to main page</Link>
    </div>
  </PageContainer>
);

export default NotFound;
