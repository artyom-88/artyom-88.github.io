import {
  CAREER_ITEM_MOCK,
  CAREER_ITEMS_MOCK,
  CAREER_RAW_ITEM_MOCK,
  CAREER_RAW_ITEMS_MOCK,
} from '__mocks__/career.mock';
import { careerListAdapter, careerModelAdapter } from 'features/career/career.adapter';
import { CareerModel } from 'features/career/career.types';

describe('career adapter', () => {
  it('should return correct list', () => {
    const list: CareerModel[] = careerListAdapter(CAREER_RAW_ITEMS_MOCK);
    expect(list).toHaveLength(CAREER_ITEMS_MOCK.length);

    const model: CareerModel = list[0];

    const { description, _id, post, site, title, tools } = model;
    const mock: CareerModel = CAREER_ITEMS_MOCK[0];

    expect(description).toEqual(mock.description);
    expect(_id).toEqual(mock._id);
    expect(post).toEqual(mock.post);
    expect(site).toEqual(mock.site);
    expect(title).toEqual(mock.title);
    expect(tools).toEqual(mock.tools);
    // TODO: dates test
    // expect(endDate.format()).toEqual(mock.endDate.format());
    // expect(startDate).toMatchObject(mock.startDate);
  });

  it('should return correct model', () => {
    const model: CareerModel = careerModelAdapter(CAREER_RAW_ITEM_MOCK);

    const { description, _id, post, site, title, tools } = model;

    expect(description).toEqual(CAREER_ITEM_MOCK.description);
    expect(_id).toEqual(CAREER_ITEM_MOCK._id);
    expect(post).toEqual(CAREER_ITEM_MOCK.post);
    expect(site).toEqual(CAREER_ITEM_MOCK.site);
    expect(title).toEqual(CAREER_ITEM_MOCK.title);
    expect(tools).toEqual(CAREER_ITEM_MOCK.tools);
    // TODO: dates test
    // expect(endDate.format()).toEqual(CAREER_ITEM_MOCK.endDate.format());
    // expect(model.formatDates()).toEqual(CAREER_ITEM_MOCK.formatDates());
    // expect(startDate).toMatchObject(CAREER_ITEM_MOCK.startDate);
  });
});
