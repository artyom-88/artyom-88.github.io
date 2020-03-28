import React, { FunctionComponent } from 'react';
import styles from './LoadingIndicator.module.scss';

/**
 * Simple loading indicator based on SVG-image
 */
const LoadingIndicator: FunctionComponent = () => (
  <div className='flexBox flexGrow-1 flexShrink-1 justifyContentCenter'>
    <div className={styles.container} />
  </div>
);

export default LoadingIndicator;
