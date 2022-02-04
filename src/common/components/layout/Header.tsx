import NavigationMenu from 'common/components/navigation/NavigationMenu';
import { ComponentWithClassName } from 'common/types/common.types';
import { ReactElement } from 'react';

const Header = ({ className = '' }: ComponentWithClassName): ReactElement => (
  <header className={className}>
    <NavigationMenu />
  </header>
);

export default Header;
