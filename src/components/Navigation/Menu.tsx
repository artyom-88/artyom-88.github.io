import React, { FunctionComponent, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { PAGES } from 'const';

import styles from './Menu.module.scss';

/**
 * Menu items render function
 */
const renderItems = (): ReactNode[] =>
  PAGES.map(
    ({ id, name, url }): ReactNode => (
      <NavLink exact={!url} className={styles.item} activeClassName={styles.active} to={`/${url}`} key={id}>
        {name}
      </NavLink>
    )
  );

/**
 * /**
 * Navigation menu component
 */
const Menu: FunctionComponent = () => (
  <nav className={`flexBox ${styles.container}`} id='menu'>
    {renderItems()}
  </nav>
);

export default Menu;
