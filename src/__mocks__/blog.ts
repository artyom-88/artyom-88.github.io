import { CURRENT_DATE_MOCK, DATE_STRING_MOCK } from 'src/__mocks__/date';
import { BlogModel } from 'src/model';
import { IBlogRawData } from 'src/types';

export const BLOG_ID = 'id';

export const BLOG_TITLE = 'title';

export const BLOG_LINK = 'link';

export const BLOG_LINK_CAPTION = 'link caption';

export const BLOG_RAW_ITEM_MOCK: IBlogRawData = {
  _id: BLOG_ID,
  date: DATE_STRING_MOCK,
  link: BLOG_LINK,
  linkCaption: BLOG_LINK_CAPTION,
  title: BLOG_TITLE,
};

export const BLOG_RAW_ITEMS_MOCK: readonly IBlogRawData[] = [BLOG_RAW_ITEM_MOCK] as const;

export const BLOG_ITEM_MOCK: BlogModel = new BlogModel(
  BLOG_ID,
  BLOG_TITLE,
  CURRENT_DATE_MOCK,
  BLOG_LINK,
  BLOG_LINK_CAPTION
);

export const BLOG_ITEMS_MOCK: readonly BlogModel[] = [BLOG_ITEM_MOCK] as const;
