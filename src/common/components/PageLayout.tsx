import type { JSX } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { GithubOutlined } from '@ant-design/icons';
import { Button, Layout, Space } from 'antd';

import { dayjs } from 'common/common-date';
import { PageProps } from 'common/common-types';
import StackOverflowIcon from 'common/components/icons/StackOverflowIcon';
import { PAGES_LIST_META } from 'common/constants/pages-constants';
import { openWindow } from 'common/utils/navigate-utils';

import styles from './PageLayout.module.scss';

const layoutClassName = 'flex flex-column align-center full-width full-height';

const contentClassName = `${layoutClassName} ${styles.content}`;

const currentYear = dayjs.utc().year();

const openGithub = () => openWindow('https://github.com/artyom-88');

const openStackOverflow = () => openWindow('https://stackoverflow.com/users/6880595/artyom-ganev');

const PageLayout = (): JSX.Element => (
  <Layout className={layoutClassName}>
    <Layout.Header className='full-width'>
      <div className=''>
        <Space>
          {PAGES_LIST_META.map(({ id, name, url }: PageProps) => (
            <NavLink key={id} to={url}>
              {name}
            </NavLink>
          ))}
        </Space>
        <Space>
          <Button onClick={openGithub} icon={<GithubOutlined />} />
          <Button onClick={openStackOverflow} icon={<StackOverflowIcon />} />
        </Space>
      </div>
    </Layout.Header>
    <Layout.Content className={contentClassName}>
      <Outlet />
    </Layout.Content>
    <Layout.Footer>© {currentYear} All rights reserved</Layout.Footer>
  </Layout>
);

export default PageLayout;
