import { JSX } from 'react';

import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import logoGlyph from '@stackoverflow/stacks-icons/src/Icon/LogoGlyphSm.svg';
import { Button } from 'antd';

import { openWindow } from 'common/utils/navigate-utils';

const openLinkedin = () => openWindow('https://www.linkedin.com/in/artem-g-185b38192/');
const openGithub = () => openWindow('https://github.com/artyom-88');
const openStackOverflow = () => openWindow('https://stackoverflow.com/users/6880595/artyom-ganev');
const stackOverflowIcon = { __html: logoGlyph as TrustedHTML };

const SocialButtons = (): JSX.Element => (
  <div className='flex align-middle justify-center'>
    <div className='p-1'>
      <Button onClick={openLinkedin} icon={<LinkedinOutlined />} />
    </div>
    <div className='p-1'>
      <Button onClick={openGithub} icon={<GithubOutlined />} />
    </div>
    <div className='p-1 self-center'>
      <Button
        onClick={openStackOverflow}
        icon={<span dangerouslySetInnerHTML={stackOverflowIcon} role='img' aria-label='stack-overflow' className='anticon' />}
      />
    </div>
  </div>
);

export default SocialButtons;
