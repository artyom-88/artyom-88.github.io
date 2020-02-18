import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import styles from './NotFound.module.scss';

const TITLE = 'Page Not Found';

/**
 * 404 page not component
 */
const NotFound = () => (
  <Container title={TITLE}>
    <div className={styles.container}>
      <Link to='/'>Go to main page</Link>
    </div>
  </Container>
);

export default NotFound;
