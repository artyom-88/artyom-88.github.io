import {
  BLOG_ITEM_MOCK,
  BLOG_ITEMS_MOCK,
  BLOG_RAW_ITEM_MOCK,
  BLOG_RAW_ITEMS_MOCK,
  CAREER_ITEM_MOCK,
  CAREER_ITEMS_MOCK,
  CAREER_RAW_ITEM_MOCK,
  CAREER_RAW_ITEMS_MOCK,
} from 'src/__mocks__';
import { blogListAdapter, blogModelAdapter } from 'src/adapter/blog';
import { careerListAdapter, careerModelAdapter } from 'src/adapter/career';
import { BlogModel, CareerModel } from 'src/model';

describe('adapter', () => {
  describe('blog', () => {
    it('should return correct list', () => {
      const list: BlogModel[] = blogListAdapter(BLOG_RAW_ITEMS_MOCK);
      expect(list).toHaveLength(BLOG_ITEMS_MOCK.length);

      const model: BlogModel = list[0];
      const { date, id, link, linkCaption, title } = model;
      const mock: BlogModel = BLOG_ITEMS_MOCK[0];

      expect(date).toEqual(mock.date);
      expect(id).toEqual(mock.id);
      expect(link).toEqual(mock.link);
      expect(linkCaption).toEqual(mock.linkCaption);
      expect(model.formatDate()).toEqual(mock.formatDate());
      expect(title).toEqual(mock.title);
    });

    it('should return correct model', () => {
      const model: BlogModel = blogModelAdapter(BLOG_RAW_ITEM_MOCK);

      const { date, id, link, linkCaption, title } = model;

      expect(date).toEqual(BLOG_ITEM_MOCK.date);
      expect(id).toEqual(BLOG_ITEM_MOCK.id);
      expect(link).toEqual(BLOG_ITEM_MOCK.link);
      expect(linkCaption).toEqual(BLOG_ITEM_MOCK.linkCaption);
      expect(model.formatDate()).toEqual(BLOG_ITEM_MOCK.formatDate());
      expect(title).toEqual(BLOG_ITEM_MOCK.title);
    });
  });

  describe('career', () => {
    it('should return correct list', () => {
      const list: CareerModel[] = careerListAdapter(CAREER_RAW_ITEMS_MOCK);
      expect(list).toHaveLength(CAREER_ITEMS_MOCK.length);

      const model: CareerModel = list[0];

      const { description, endDate, id, post, site, startDate, title, tools } = model;
      const mock: CareerModel = CAREER_ITEMS_MOCK[0];

      expect(description).toEqual(mock.description);
      expect(endDate.format()).toEqual(mock.endDate.format());
      expect(id).toEqual(mock.id);
      expect(model.formatDates()).toEqual(mock.formatDates());
      expect(post).toEqual(mock.post);
      expect(site).toEqual(mock.site);
      expect(startDate).toMatchObject(mock.startDate);
      expect(title).toEqual(mock.title);
      expect(tools).toEqual(mock.tools);
    });

    it('should return correct model', () => {
      const model: CareerModel = careerModelAdapter(CAREER_RAW_ITEM_MOCK);

      const { description, endDate, id, post, site, startDate, title, tools } = model;

      expect(description).toEqual(CAREER_ITEM_MOCK.description);
      expect(endDate.format()).toEqual(CAREER_ITEM_MOCK.endDate.format());
      expect(id).toEqual(CAREER_ITEM_MOCK.id);
      expect(model.formatDates()).toEqual(CAREER_ITEM_MOCK.formatDates());
      expect(post).toEqual(CAREER_ITEM_MOCK.post);
      expect(site).toEqual(CAREER_ITEM_MOCK.site);
      expect(startDate).toMatchObject(CAREER_ITEM_MOCK.startDate);
      expect(title).toEqual(CAREER_ITEM_MOCK.title);
      expect(tools).toEqual(CAREER_ITEM_MOCK.tools);
    });
  });
});
