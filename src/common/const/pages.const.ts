import DomainTwoToneIcon from '@material-ui/icons/DomainTwoTone';
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';
import HomeTwoTone from '@material-ui/icons/HomeTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import { PageProps } from 'common/types/common.types';

export const ABOUT_PAGE_META: PageProps = { id: 'about', Icon: HelpTwoToneIcon, name: 'About', url: 'about' };

export const BLOG: PageProps = { id: 'blog', Icon: MenuBookTwoToneIcon, name: 'Blog', url: 'blog' };

export const CAREER: PageProps = { id: 'career', Icon: DomainTwoToneIcon, name: 'Career', url: 'career' };

export const CONTACTS_PAGE_META: PageProps = {
  id: 'contacts',
  Icon: MailTwoToneIcon,
  name: 'Contacts',
  url: 'contacts',
};

export const MAIN_PAGE_META: PageProps = { id: 'main', Icon: HomeTwoTone, name: 'Main', url: '' };

/**
 * PagesConst settings
 */
export const PAGES_LIST_META: PageProps[] = [MAIN_PAGE_META, ABOUT_PAGE_META, BLOG, CAREER, CONTACTS_PAGE_META];
