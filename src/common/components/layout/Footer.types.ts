import { FC } from 'react';

export enum FooterLinks {
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  LINKEDIN = 'LINKEDIN',
  STACKOVERFLOW = 'STACKOVERFLOW',
}

export interface BottomNavigationLink {
  Icon: FC;
  url: string;
}

export interface BottomNavigationSettings {
  [key: string]: BottomNavigationLink;
}
