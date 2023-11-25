import { FC, ReactElement } from 'react';

import Icon from '@ant-design/icons';
import logoGlyph from '@stackoverflow/stacks-icons/src/Icon/LogoGlyphSm.svg';

const StackOverflowIcon: FC = (): ReactElement => (
  <Icon>
    <img src={logoGlyph} alt='Stackoverflow' />
  </Icon>
);

export default StackOverflowIcon;
