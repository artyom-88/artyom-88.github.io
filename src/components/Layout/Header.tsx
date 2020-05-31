import React, { FunctionComponent } from 'react';
import { NavigationMenu } from 'src/components/Navigation';
import { IClassName } from 'src/components/types';

/**
 * Header component
 */
const Header: FunctionComponent<IClassName> = ({ className = '' }: IClassName) => (
  <header className={className}>
    <NavigationMenu />
  </header>
);

export default Header;
