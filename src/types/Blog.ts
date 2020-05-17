import { BlogModel } from 'src/model';
import { IErrorState } from 'src/types';

export interface IBlogRawData {
  _id: string;
  title: string;
  date: string;
  link: string;
  linkCaption: string;
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
