import { BlogModel } from 'model';
import { IBlogRawData } from 'types';

export const blogModelAdapter = (data: IBlogRawData): BlogModel => {
  const { _id, date, link, linkCaption, title } = data;
  // prettier-ignore
  return BlogModel.create()
    .date(date)
    .link(link)
    .linkCaption(linkCaption)
    .title(title)
    .id(_id)
    .build();
};

export const blogListAdapter = (items: readonly IBlogRawData[]): BlogModel[] => items.map(blogModelAdapter);
