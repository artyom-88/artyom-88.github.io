import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { BottomNavigationSettings, FooterLinks } from './Footer.types';

export const RIGHTS_TEXT = `© ${new Date().getFullYear()} All rights reserved`;

export const FOOTER_LINKS: BottomNavigationSettings = {
  [FooterLinks.GITHUB]: {
    Icon: GitHubIcon,
    url: 'https://github.com/Artyom-Ganev',
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
