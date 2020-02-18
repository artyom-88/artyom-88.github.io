import React from 'react';
import Routes from '../Navigation/Routes';
import styles from './Content.module.scss';

/**
 * App Content component
 */
const Content = () => (
  <>
    <div className={styles.background} />
    <div className={`flexBox flexColumn ${styles.container}`}>
      <Routes />
    </div>
  </>
);

export default Content;
