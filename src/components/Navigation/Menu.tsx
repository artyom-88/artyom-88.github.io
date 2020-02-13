import React from 'react';
import { NavLink } from 'react-router-dom';
import { PAGES } from '../../constants/Pages';
import './Menu.scss';

/**
 * Menu items render function
 */
const renderItems = () =>
  PAGES.map(({ id, name, url }) => (
    <NavLink exact={!url} className='nav-menu__item' activeClassName='active' to={`/${url}`} key={id}>
      {name}
    </NavLink>
  ));

/**
 * /**
 * Navigation menu component
 */
const Menu = () => (
  <nav className='flexBox nav-menu__root' id='menu'>
    {renderItems()}
  </nav>
);

export default Menu;
