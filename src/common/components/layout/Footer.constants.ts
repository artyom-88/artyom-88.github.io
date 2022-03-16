import FacebookIcon from 'common/components/icons/FacebookIcon';
import GitHubIcon from 'common/components/icons/GitHubIcon';
import LinkedInIcon from 'common/components/icons/LinkedInIcon';
import StackOverflowIcon from 'common/components/icons/StackOverflowIcon';
import { BottomNavigationSettings, FooterLinks } from './Footer.types';

export const RIGHTS_TEXT = `© ${new Date().getFullYear()} All rights reserved`;

export const FOOTER_LINKS: BottomNavigationSettings = {
  [FooterLinks.GITHUB]: {
    Icon: GitHubIcon,
    url: 'https://github.com/Artyom-Ganev',
  },
  [FooterLinks.STACKOVERFLOW]: {
    Icon: StackOverflowIcon,
    url: 'https://stackoverflow.com/users/6880595/artyom-ganev',
  },
  [FooterLinks.LINKEDIN]: {
    Icon: LinkedInIcon,
    url: 'https://www.linkedin.com/in/artem-ganev-185b38192',
  },
  [FooterLinks.FACEBOOK]: {
    Icon: FacebookIcon,
    url: 'https://www.facebook.com/artyom.ganev',
  },
};
