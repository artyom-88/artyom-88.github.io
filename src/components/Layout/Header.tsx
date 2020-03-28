import React, { FunctionComponent } from 'react';
import { Menu } from 'src/components/Navigation';

/**
 * Header component
 */
const Header: FunctionComponent = () => (
  <header className='flexBox'>
    <Menu />
  </header>
);

export default Header;
