import { HomeOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons';

import { PageProps } from 'common/common-types';

export const ABOUT_PAGE_META: PageProps = {
  Icon: HomeOutlined,
  id: 'about',
  name: 'About',
  url: '',
};

export const BLOG_PAGE_META: PageProps = {
  Icon: MenuOutlined,
  id: 'blog',
  name: 'Blog',
  url: 'blog',
};

export const CAREER_PAGE_META: PageProps = {
  Icon: SettingOutlined,
  id: 'career',
  name: 'Career',
  url: 'career',
};

export const PAGES_LIST_META: PageProps[] = [ABOUT_PAGE_META, BLOG_PAGE_META, CAREER_PAGE_META];

export const DEFAULT_TITLE = "Artyom Ganev's site";

export const DEFAULT_DESCRIPTION =
  'Senior Software Developer. TypeScript, React, Redux, CI/CD, unit testing, code review, Java, Node JS, Linux';
