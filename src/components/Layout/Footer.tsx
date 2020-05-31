import Container from '@material-ui/core/Container';
import React, { FunctionComponent } from 'react';
import { IClassName } from 'src/components/types';

export const RIGHTS_TEXT = '© 2020 All rights reserved';

/**
 * Footer component
 */
const Footer: FunctionComponent<IClassName> = ({ className }: IClassName) => (
  <Container className={className} disableGutters fixed component='footer'>
    <span>{RIGHTS_TEXT}</span>
  </Container>
);

export default Footer;
