import {
  BLOG_ID_MOCK,
  BLOG_ITEM_RESPONSE_MOCK,
  BLOG_LIST_RESPONSE_MOCK,
  BLOG_RAW_ITEM_MOCK,
  BLOG_RAW_ITEMS_MOCK,
  CAREER_ID_MOCK,
  CAREER_ITEM_RESPONSE_MOCK,
  CAREER_LIST_RESPONSE_MOCK,
  CAREER_RAW_ITEM_MOCK,
  CAREER_RAW_ITEMS_MOCK,
} from '__mocks__';
import { loadBlog, loadBlogList } from 'api/blog';
import { loadCareer, loadCareerList } from 'api/career';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('api', () => {
  describe('blog', () => {
    it('should return raw data list', async () => {
      (axios.get as jest.Mock).mockReturnValue(BLOG_LIST_RESPONSE_MOCK);
      const { data } = await loadBlogList();
      expect(data).toEqual(BLOG_RAW_ITEMS_MOCK);
    });

    it('should return raw data item', async () => {
      (axios.get as jest.Mock).mockReturnValue(BLOG_ITEM_RESPONSE_MOCK);
      const { data } = await loadBlog(BLOG_ID_MOCK);
      expect(data).toEqual(BLOG_RAW_ITEM_MOCK);
    });
  });

  describe('career', () => {
    it('should return raw data list', async () => {
      (axios.get as jest.Mock).mockReturnValue(CAREER_LIST_RESPONSE_MOCK);
      const { data } = await loadCareerList();
      expect(data).toEqual(CAREER_RAW_ITEMS_MOCK);
    });

    it('should return raw data item', async () => {
      (axios.get as jest.Mock).mockReturnValue(CAREER_ITEM_RESPONSE_MOCK);
      const { data } = await loadCareer(CAREER_ID_MOCK);
      expect(data).toEqual(CAREER_RAW_ITEM_MOCK);
    });
  });
});
