import AppBar from '@material-ui/core/AppBar';
import React, { FunctionComponent } from 'react';
import { NavigationMenu } from 'src/components/Navigation';
import { IClassName } from 'src/components/types';

/**
 * Header component
 */
const Header: FunctionComponent<IClassName> = ({ className = '' }: IClassName) => (
  <AppBar className={className}>
    <NavigationMenu />
  </AppBar>
);

export default Header;
