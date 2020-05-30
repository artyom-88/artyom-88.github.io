import React, { FunctionComponent } from 'react';
import { IClassName } from 'src/components/types';

export const RIGHTS_TEXT = '© 2019 All rights reserved';

/**
 * Footer component
 */
const Footer: FunctionComponent<IClassName> = ({ className }: IClassName) => (
  <footer className={className}>
    <span>{RIGHTS_TEXT}</span>
  </footer>
);

export default Footer;
