import { FC } from 'react';

export interface WithIcon {
  icon?: FC;
}

export interface PageProps extends WithIcon {
  id: string;
  url: string;
  handlePreload: () => void;
}

export interface BaseModel {
  _id: string;
  title: string;
}

export interface WithClassName {
  className?: string;
}

export type Object<TValue = unknown> = Record<string, TValue>;
