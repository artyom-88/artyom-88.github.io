import Icon from '@mui/material/Icon';
import logoGlyph from '@stackoverflow/stacks-icons/src/Icon/LogoGlyphSm.svg';
import { FC, ReactElement } from 'react';

const StackOverflowIcon: FC = (): ReactElement => (
  <Icon>
    <img src={logoGlyph} alt='Stackoverflow' />
  </Icon>
);

export default StackOverflowIcon;
