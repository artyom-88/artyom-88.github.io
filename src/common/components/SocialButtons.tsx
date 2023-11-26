import { FC, ReactElement } from 'react';

import { GithubOutlined } from '@ant-design/icons';
import logoGlyph from '@stackoverflow/stacks-icons/src/Icon/LogoGlyphSm.svg';
import { Button } from 'antd';

import { openWindow } from 'common/utils/navigate-utils';

const openGithub = () => openWindow('https://github.com/artyom-88');

const openStackOverflow = () => openWindow('https://stackoverflow.com/users/6880595/artyom-ganev');

const icon = { __html: logoGlyph as TrustedHTML };

const SocialButtons: FC = (): ReactElement => (
  <div className='flex align-middle justify-center'>
    <div className='p-1'>
      <Button onClick={openGithub} icon={<GithubOutlined />} />
    </div>
    <div className='p-1 self-center'>
      <Button
        onClick={openStackOverflow}
        icon={<span dangerouslySetInnerHTML={icon} role='img' aria-label='stack-overflow' className='anticon' />}
      />
    </div>
  </div>
);

export default SocialButtons;
