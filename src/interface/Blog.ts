import { BlogModel } from 'src/model';

export interface IRawBlogData {
  id: string;
  title: string;
  year: number;
  month: number;
  day: number;
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
