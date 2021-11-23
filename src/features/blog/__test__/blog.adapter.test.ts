import { BLOG_ITEM_MOCK, BLOG_ITEMS_MOCK, BLOG_RAW_ITEM_MOCK, BLOG_RAW_ITEMS_MOCK } from '__mocks__/blog.mock';
import { blogListAdapter, blogModelAdapter } from 'features/blog/blog.adapter';
import { BlogModel } from 'features/blog/blog.types';

describe('blog adapter', () => {
  it('should return correct list', () => {
    const list: BlogModel[] = blogListAdapter(BLOG_RAW_ITEMS_MOCK);
    expect(list).toHaveLength(BLOG_ITEMS_MOCK.length);

    const model: BlogModel = list[0];
    const { date, _id, link, linkCaption, title } = model;
    const mock: BlogModel = BLOG_ITEMS_MOCK[0];

    expect(date).toEqual(mock.date);
    expect(_id).toEqual(mock._id);
    expect(link).toEqual(mock.link);
    expect(linkCaption).toEqual(mock.linkCaption);
    // TODO: test date
    // expect(formatDate(model)).toEqual(mock.formatDate());
    expect(title).toEqual(mock.title);
  });

  it('should return correct model', () => {
    const model: BlogModel = blogModelAdapter(BLOG_RAW_ITEM_MOCK);

    const { date, _id, link, linkCaption, title } = model;

    expect(date).toEqual(BLOG_ITEM_MOCK.date);
    expect(_id).toEqual(BLOG_ITEM_MOCK._id);
    expect(link).toEqual(BLOG_ITEM_MOCK.link);
    expect(linkCaption).toEqual(BLOG_ITEM_MOCK.linkCaption);
    // TODO: test date
    // expect(model.formatDate()).toEqual(BLOG_ITEM_MOCK.formatDate());
    expect(title).toEqual(BLOG_ITEM_MOCK.title);
  });
});
