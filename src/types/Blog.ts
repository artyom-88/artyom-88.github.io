import { BlogModel } from 'model';
import { IErrorState } from 'types';

export interface IBlogRawData {
  _id: string;
  date: string;
  link: string;
  linkCaption: string;
  title: string;
}

export interface IBlogDetail {
  id: string;
}

export interface IBlogDetailItems {
  [key: string]: IBlogDetail;
}

export interface IBlogState extends IErrorState {
  items: BlogModel[];
  detail: IBlogDetailItems;
}
