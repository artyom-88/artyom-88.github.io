import { HomeOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons';

import { PageProps } from 'common/common-types';
import * as routesConstants from 'common/routes/routes-constants';

export const ABOUT_PAGE_PROPS: PageProps = {
  Icon: HomeOutlined,
  id: routesConstants.ABOUT_PAGE_ID,
  url: routesConstants.ROOT_URL,
};

export const BLOG_PAGE_PROPS: PageProps = {
  Icon: MenuOutlined,
  id: routesConstants.BLOG_PAGE_ID,
  url: routesConstants.BLOG_URL,
};

export const CAREER_PAGE_PROPS: PageProps = {
  Icon: SettingOutlined,
  id: routesConstants.CAREER_PAGE_ID,
  url: routesConstants.CAREER_URL,
};

export const PAGES_PROPS_LIST: PageProps[] = [ABOUT_PAGE_PROPS, BLOG_PAGE_PROPS, CAREER_PAGE_PROPS];

export const DEFAULT_DESCRIPTION =
  'Lead Software Developer. TypeScript, React, Node JS, CI/CD, Unit testing, Code review, AWS, Java, Linux';
