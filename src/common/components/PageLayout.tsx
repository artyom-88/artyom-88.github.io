import type { JSX, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

import MenuOutlined from '@ant-design/icons/MenuOutlined';
import Button from 'antd/es/button';
import Layout from 'antd/es/layout';
import Popover from 'antd/es/popover';
import Space from 'antd/es/space';
import Typography from 'antd/es/typography';

import { dayjs } from 'common/common-date';
import { PageProps } from 'common/common-types';
import SocialButtons from 'common/components/SocialButtons';
import { PAGES_PROPS_LIST } from 'common/constants/pages-constants';
import useToggleValue from 'common/hooks/use-toggle-value';

import styles from './PageLayout.module.scss';

const currentYear = dayjs.utc().year();

const PageLayout = ({ children }: PropsWithChildren): JSX.Element => {
  const [open, toggleOpen] = useToggleValue();
  return (
    <Layout className='flex flex-col align-middle h-full w-full'>
      <Layout.Header className={`flex align-middle justify-between w-full h-20 px-5 ${styles.header}`}>
        <Popover
          onOpenChange={toggleOpen}
          open={open}
          content={
            <Space direction='vertical' data-testid='nav-menu-content'>
              {PAGES_PROPS_LIST.map(({ id, url, handlePreload }: PageProps) => (
                <Typography.Text key={id} strong>
                  <NavLink
                    className='capitalize'
                    to={url}
                    onClick={toggleOpen}
                    onMouseEnter={handlePreload}
                    onFocus={handlePreload}
                  >
                    {id}
                  </NavLink>
                </Typography.Text>
              ))}
            </Space>
          }
          trigger='click'
        >
          <div className='p-1'>
            <Button icon={<MenuOutlined />} data-testid='nav-menu' />
          </div>
        </Popover>
        <SocialButtons />
      </Layout.Header>
      <Layout.Content className={`bg-slate-100 p-5 overflow-y-auto ${styles.content}`}>{children}</Layout.Content>
      <Layout.Footer className={`text-center h-10 ${styles.footer}`}>© {currentYear} All rights reserved</Layout.Footer>
    </Layout>
  );
};

export default PageLayout;
