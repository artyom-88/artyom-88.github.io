import { JSX } from 'react';

import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import logoGlyph from '@stackoverflow/stacks-icons/src/Icon/LogoGlyphSm.svg';
import { Button, Tooltip } from 'antd';

import { WithClassName } from 'common/common-types';
import { openWindow } from 'common/utils/navigate-utils';

const openLinkedin = () => openWindow('https://www.linkedin.com/in/artem-g-185b38192/');
const openGithub = () => openWindow('https://github.com/artyom-88');
const openStackOverflow = () => openWindow('https://stackoverflow.com/users/6880595/artyom-ganev');
const stackOverflowIcon = { __html: logoGlyph as TrustedHTML };

interface SocialButtonProps extends WithClassName {
  icon: JSX.Element;
  name: string;
  onClick: () => void;
}

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
