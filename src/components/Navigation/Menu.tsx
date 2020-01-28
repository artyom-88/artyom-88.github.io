import React from 'react';
import { NavLink } from 'react-router-dom';
import { PAGES } from '../../constants/Pages';
import './Menu.scss';

/**
 * Menu items render function
 */
const renderItems = () =>
  PAGES.map(({ id, name, url }) => (
    <NavLink exact={true} className='nav-menu__item' activeClassName='active' to={`/${url}`} key={id}>
      {name}
    </NavLink>
  ));

/**
 * /**
 * Navigation menu component
 */
export default () => (
  <div className='flexBox nav-menu__root' id='menu'>
    {renderItems()}
  </div>
);
