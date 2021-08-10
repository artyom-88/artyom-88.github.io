import { IClassName } from 'components/Components.types';
import NavigationMenu from 'components/Navigation/NavigationMenu';
import { ReactElement } from 'react';

/**
 * Header component
 */
const Header = ({ className = '' }: IClassName): ReactElement => (
  <header className={className}>
    <NavigationMenu />
  </header>
);

export default Header;
