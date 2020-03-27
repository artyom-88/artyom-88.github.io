import React, { FunctionComponent } from 'react';

import styles from './Footer.module.scss';

/**
 * Footer component
 */
const Footer: FunctionComponent = () => (
  <footer className={styles.container}>
    <span>© 2019 All rights reserved</span>
  </footer>
);

export default Footer;
