import { SvgIconComponent } from '@mui/icons-material';

export enum FooterLinks {
  GITHUB = 'GITHUB',
  LINKEDIN = 'LINKEDIN',
  FACEBOOK = 'FACEBOOK',
}

export interface BottomNavigationLink {
  Icon: SvgIconComponent;
  url: string;
}

export interface BottomNavigationSettings {
  [key: string]: BottomNavigationLink;
}
