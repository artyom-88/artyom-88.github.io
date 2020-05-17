import { BlogModel } from 'src/model';
import { IBlogRawData } from 'src/types';

export const blogModelAdapter = ({ _id, date, link, linkCaption, title }: IBlogRawData): BlogModel => {
  // prettier-ignore
  return BlogModel.create()
    .date(date)
    .link(link)
    .linkCaption(linkCaption)
    .title(title)
    .id(_id)
    .build();
};

export const blogListAdapter = (items: IBlogRawData[]): BlogModel[] => items.map(blogModelAdapter);
