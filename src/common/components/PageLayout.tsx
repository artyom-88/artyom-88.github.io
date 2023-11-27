import type { JSX } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { Layout, Space, Typography } from 'antd';

import { dayjs } from 'common/common-date';
import { PageProps } from 'common/common-types';
import SocialButtons from 'common/components/SocialButtons';
import { PAGES_PROPS_LIST } from 'common/constants/pages-constants';

import styles from './PageLayout.module.scss';

const currentYear = dayjs.utc().year();

const PageLayout = (): JSX.Element => (
  <Layout className='flex flex-col align-middle h-full w-full'>
    <Layout.Header className={`flex justify-between w-full h-20 px-10 ${styles.header}`}>
      <Space align='center' size='large'>
        {PAGES_PROPS_LIST.map(({ id, url }: PageProps) => (
          <Typography.Title key={id} level={3}>
            <NavLink className='capitalize' to={url}>
              {id}
            </NavLink>
          </Typography.Title>
        ))}
      </Space>
      <SocialButtons />
    </Layout.Header>
    <Layout.Content className={`bg-slate-100 p-10 overflow-y-auto ${styles.content}`}>
      <Outlet />
    </Layout.Content>
    <Layout.Footer className={`text-center h-10 ${styles.footer}`}>© {currentYear} All rights reserved</Layout.Footer>
  </Layout>
);

export default PageLayout;
