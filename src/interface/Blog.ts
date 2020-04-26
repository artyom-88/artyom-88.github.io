import { BlogModel } from 'src/model';

export interface IRawBlogData {
  _id: string;
  title: string;
  date: string;
  link: string;
  linkCaption: string;
}

export interface IBlogDetail {
  id: string;
}

export interface IBlogItems {
  [key: string]: BlogModel;
}

export interface IBlogDetailItems {
  [key: string]: IBlogDetail;
}

export interface IBlogState {
  items: IBlogItems;
  detail: IBlogDetailItems;
}
