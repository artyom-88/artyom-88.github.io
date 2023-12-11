import { JSX } from 'react';

import GithubOutlined from '@ant-design/icons/GithubOutlined';
import LinkedinOutlined from '@ant-design/icons/LinkedinOutlined';
import logoGlyph from '@stackoverflow/stacks-icons/src/Icon/LogoGlyphSm.svg';
import Button from 'antd/es/button';
import Tooltip from 'antd/es/tooltip';

import { SocialButtonProps } from 'common/components/common-components-types';
import { openWindow } from 'common/utils/navigate-utils';

const openLinkedin = () => openWindow('https://www.linkedin.com/in/artem-g-185b38192/');

const openGithub = () => openWindow('https://github.com/artyom-88');

const openStackOverflow = () => openWindow('https://stackoverflow.com/users/6880595/artyom-ganev');

const stackOverflowIcon = { __html: logoGlyph as TrustedHTML };

const SocialButton = ({ className = '', icon, onClick, name }: SocialButtonProps): JSX.Element => (
  <div className={`p-1 ${className}`}>
    <Tooltip title={`Click to open my ${name} profile page`}>
      <Button onClick={onClick} icon={icon} />
    </Tooltip>
  </div>
);

const SocialButtons = (): JSX.Element => (
  <div className='flex align-middle justify-center'>
    <SocialButton onClick={openLinkedin} icon={<LinkedinOutlined />} name='Linkedin' />
    <SocialButton onClick={openGithub} icon={<GithubOutlined />} name='GitHub' />
    <SocialButton
      className='self-center'
      onClick={openStackOverflow}
      icon={<span dangerouslySetInnerHTML={stackOverflowIcon} role='img' aria-label='stack-overflow' className='anticon' />}
      name='Stackoverflow'
    />
  </div>
);

export default SocialButtons;
