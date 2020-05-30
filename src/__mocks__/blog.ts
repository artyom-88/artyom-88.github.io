import { CURRENT_DATE_MOCK, DATE_STRING_MOCK } from 'src/__mocks__/date';
import { BlogModel } from 'src/model';
import { IBlogRawData } from 'src/types';

export const BLOG_ID_MOCK = 'id';

export const BLOG_TITLE_MOCK = 'title';

export const BLOG_LINK_MOCK = 'link';

export const BLOG_LINK_CAPTION_MOCK = 'link caption';

export const BLOG_RAW_ITEM_MOCK: IBlogRawData = {
  _id: BLOG_ID_MOCK,
  date: DATE_STRING_MOCK,
  link: BLOG_LINK_MOCK,
  linkCaption: BLOG_LINK_CAPTION_MOCK,
  title: BLOG_TITLE_MOCK,
};

export const BLOG_RAW_ITEMS_MOCK: readonly IBlogRawData[] = [BLOG_RAW_ITEM_MOCK] as const;

export const BLOG_LIST_RESPONSE_MOCK = {
  data: BLOG_RAW_ITEMS_MOCK,
};

export const BLOG_ITEM_RESPONSE_MOCK = {
  data: BLOG_RAW_ITEM_MOCK,
};

export const BLOG_ITEM_MOCK: BlogModel = new BlogModel(
  BLOG_ID_MOCK,
  BLOG_TITLE_MOCK,
  CURRENT_DATE_MOCK,
  BLOG_LINK_MOCK,
  BLOG_LINK_CAPTION_MOCK
);

export const BLOG_ITEMS_MOCK: readonly BlogModel[] = [BLOG_ITEM_MOCK] as const;
