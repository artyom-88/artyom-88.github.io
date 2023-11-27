import { FC } from 'react';

export interface WithIcon {
  Icon?: FC;
}

export interface PageProps extends WithIcon {
  id: string;
  url: string;
}

export interface BaseModel {
  _id: string;
  title: string;
}

export interface WithClassName {
  className: string;
}

export type Object<TValue = unknown> = Record<string, TValue>;
