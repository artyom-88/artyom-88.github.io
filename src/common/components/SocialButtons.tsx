import GithubOutlined from '@ant-design/icons/GithubOutlined';
import LinkedinOutlined from '@ant-design/icons/LinkedinOutlined';
import stackOverflowIcon from '@stackoverflow/stacks-icons/src/Icon/LogoGlyphSm.svg';
import Button from 'antd/es/button';
import Tooltip from 'antd/es/tooltip';
import type { SocialButtonProps } from 'common/components/common-components-types';
import { openWindow } from 'common/utils/navigate-utils';
import type { JSX } from 'react';

const openLinkedin = () => openWindow('https://linkedin.com/in/artem-ganev/');

const openGithub = () => openWindow('https://github.com/artyom-88');

const openStackOverflow = () => openWindow('https://stackoverflow.com/users/6880595/artyom-ganev');

const stackOverflowIconSrc = `data:image/svg+xml;utf8,${encodeURIComponent(stackOverflowIcon)}`;

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
      icon={<img src={stackOverflowIconSrc} alt='Stack Overflow' className='anticon' />}
      name='Stackoverflow'
    />
  </div>
);

export default SocialButtons;
