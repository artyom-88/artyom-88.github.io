import {
  CAREER_ID_MOCK,
  CAREER_ITEM_RESPONSE_MOCK,
  CAREER_LIST_RESPONSE_MOCK,
  CAREER_RAW_ITEM_MOCK,
  CAREER_RAW_ITEMS_MOCK,
} from '__mocks__/career.mock';
import apiClient from 'app/apiClient';
import careerApi from 'features/career/career.api';

jest.mock('app/apiClient', () => ({
  get: jest.fn(),
}));

describe('career api', () => {
  it('should return raw data list', async () => {
    (apiClient.get as jest.Mock).mockReturnValue(CAREER_LIST_RESPONSE_MOCK);
    const { data } = await careerApi.loadCareerList();
    expect(data).toEqual(CAREER_RAW_ITEMS_MOCK);
  });

  it('should return raw data item', async () => {
    (apiClient.get as jest.Mock).mockReturnValue(CAREER_ITEM_RESPONSE_MOCK);
    const { data } = await careerApi.loadCareer(CAREER_ID_MOCK);
    expect(data).toEqual(CAREER_RAW_ITEM_MOCK);
  });
});
