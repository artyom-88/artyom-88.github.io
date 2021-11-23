import {
  BLOG_ID_MOCK,
  BLOG_ITEM_RESPONSE_MOCK,
  BLOG_LIST_RESPONSE_MOCK,
  BLOG_RAW_ITEM_MOCK,
  BLOG_RAW_ITEMS_MOCK,
} from '__mocks__/blog.mock';
import apiClient from 'app/apiClient';
import { loadBlog, loadBlogList } from 'features/blog/blog.api';

jest.mock('app/apiClient', () => ({
  get: jest.fn(),
}));

describe('blog api', () => {
  it('should return raw data list', async () => {
    (apiClient.get as jest.Mock).mockReturnValue(BLOG_LIST_RESPONSE_MOCK);
    const { data } = await loadBlogList();
    expect(data).toEqual(BLOG_RAW_ITEMS_MOCK);
  });

  it('should return raw data item', async () => {
    (apiClient.get as jest.Mock).mockReturnValue(BLOG_ITEM_RESPONSE_MOCK);
    const { data } = await loadBlog(BLOG_ID_MOCK);
    expect(data).toEqual(BLOG_RAW_ITEM_MOCK);
  });
});
