import { NavigationMenu } from 'components/Navigation';
import { IClassName } from 'components/types';
import React, { FC } from 'react';

/**
 * Header component
 */
const Header: FC<IClassName> = ({ className = '' }: IClassName) => (
  <header className={className}>
    <NavigationMenu />
  </header>
);

export default Header;
