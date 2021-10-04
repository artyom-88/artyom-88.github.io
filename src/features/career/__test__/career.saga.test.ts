import { CAREER_ITEMS_MOCK, CAREER_LIST_RESPONSE_MOCK, CAREER_RAW_ITEMS_MOCK } from '__mocks__/career.mock';
import { careerListAdapter } from 'features/career/career.adapter';
import * as careerApi from 'features/career/career.api';
import { default as careerSaga, loadCareerList } from 'features/career/career.saga';
import { careerLoadList, careerLoadListSuccess } from 'features/career/career.slice';
import { testSaga } from 'redux-saga-test-plan';

jest.mock('features/career/career.api', () => ({
  loadCareerList: jest.fn(),
}));

describe('career saga', () => {
  describe('career', () => {
    it('loadCareerList', () => {
      (careerApi.loadCareerList as jest.Mock).mockReturnValue(CAREER_LIST_RESPONSE_MOCK);
      testSaga(loadCareerList)
        .next()
        .call(careerApi.loadCareerList)
        .next(CAREER_LIST_RESPONSE_MOCK)
        .call(careerListAdapter, CAREER_RAW_ITEMS_MOCK)
        .next(CAREER_ITEMS_MOCK)
        .put(careerLoadListSuccess(CAREER_ITEMS_MOCK))
        .next()
        .isDone();
    });

    it('careerSaga', () => {
      testSaga(careerSaga).next().takeEvery(careerLoadList.type, loadCareerList).next().isDone();
    });
  });
});
