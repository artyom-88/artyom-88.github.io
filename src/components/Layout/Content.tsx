import React, { FunctionComponent } from 'react';
import { Routes } from 'src/components/Navigation';
import styles from './Content.module.scss';

/**
 * App Content component
 */
const Content: FunctionComponent = () => (
  <>
    <div className={styles.background} />
    <div className={`flexBox flexColumn ${styles.container}`}>
      <Routes />
    </div>
  </>
);

export default Content;
