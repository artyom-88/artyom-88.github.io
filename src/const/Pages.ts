import DomainTwoToneIcon from '@material-ui/icons/DomainTwoTone';
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';
import HomeTwoTone from '@material-ui/icons/HomeTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import { IPageProps } from 'components/Pages';

export const ABOUT: IPageProps = { id: 'about', Icon: HelpTwoToneIcon, name: 'About', url: 'about' };
export const BLOG: IPageProps = { id: 'blog', Icon: MenuBookTwoToneIcon, name: 'Blog', url: 'blog' };
export const CAREER: IPageProps = { id: 'career', Icon: DomainTwoToneIcon, name: 'Career', url: 'career' };
export const CONTACTS: IPageProps = { id: 'contacts', Icon: MailTwoToneIcon, name: 'Contacts', url: 'contacts' };
export const MAIN: IPageProps = { id: 'main', Icon: HomeTwoTone, name: 'Main', url: '' };

/**
 * Pages settings
 */
export const PAGES: IPageProps[] = [MAIN, ABOUT, BLOG, CAREER, CONTACTS];
