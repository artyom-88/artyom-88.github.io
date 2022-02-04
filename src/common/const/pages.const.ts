import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import { PageProps } from 'common/types/common.types';

export const ABOUT_PAGE_META: PageProps = {
  Icon: HomeTwoTone,
  id: 'about',
  name: 'About',
  url: '',
};

export const BLOG_PAGE_META: PageProps = {
  Icon: MenuBookTwoToneIcon,
  id: 'blog',
  name: 'Blog',
  url: 'blog',
};

export const CAREER_PAGE_META: PageProps = {
  Icon: DomainTwoToneIcon,
  id: 'career',
  name: 'Career',
  url: 'career',
};

export const CONTACTS_PAGE_META: PageProps = {
  Icon: MailTwoToneIcon,
  id: 'contacts',
  name: 'Contacts',
  url: 'contacts',
};

/**
 * PagesConst settings
 */
export const PAGES_LIST_META: PageProps[] = [ABOUT_PAGE_META, BLOG_PAGE_META, CAREER_PAGE_META, CONTACTS_PAGE_META];

export const DEFAULT_DESCRIPTION =
  'Senior Software Developer. TypeScript, React, Redux, CI/CD, unit testing, code review, Java, Node JS, Linux';
