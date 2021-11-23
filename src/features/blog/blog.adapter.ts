import { DEFAULT_DATE_FORMAT } from 'common/const/date.const';
import { utc } from 'moment';
import { BlogDTO, BlogModel } from './blog.types';

export const blogModelAdapter = ({ _id, date, link, linkCaption, title }: BlogDTO): BlogModel => ({
  _id,
  date: utc(date, DEFAULT_DATE_FORMAT),
  link,
  linkCaption,
  title,
});

export const blogListAdapter = (items: readonly BlogDTO[]): BlogModel[] => items.map(blogModelAdapter);
