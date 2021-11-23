import { CURRENT_DATE_MOCK, DATE_STRING_MOCK } from '__mocks__/date.mock';
import { BlogDTO, BlogModel } from 'features/blog/blog.types';

export const BLOG_ID_MOCK = 'id';

export const BLOG_TITLE_MOCK = 'title';

export const BLOG_LINK_MOCK = 'link';

export const BLOG_LINK_CAPTION_MOCK = 'link caption';

export const BLOG_RAW_ITEM_MOCK: BlogDTO = {
  _id: BLOG_ID_MOCK,
  date: DATE_STRING_MOCK,
  link: BLOG_LINK_MOCK,
  linkCaption: BLOG_LINK_CAPTION_MOCK,
  title: BLOG_TITLE_MOCK,
};

export const BLOG_RAW_ITEMS_MOCK: readonly BlogDTO[] = [BLOG_RAW_ITEM_MOCK] as const;

export const BLOG_LIST_RESPONSE_MOCK = {
  data: BLOG_RAW_ITEMS_MOCK,
};

export const BLOG_ITEM_RESPONSE_MOCK = {
  data: BLOG_RAW_ITEM_MOCK,
};

export const BLOG_ITEM_MOCK: BlogModel = {
  _id: BLOG_ID_MOCK,
  title: BLOG_TITLE_MOCK,
  date: CURRENT_DATE_MOCK,
  link: BLOG_LINK_MOCK,
  linkCaption: BLOG_LINK_CAPTION_MOCK,
};

export const BLOG_ITEMS_MOCK: readonly BlogModel[] = [BLOG_ITEM_MOCK] as const;
