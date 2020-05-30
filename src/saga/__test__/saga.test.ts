import axios from 'axios';
import { testSaga } from 'redux-saga-test-plan';
import {
  BLOG_ITEMS_MOCK,
  BLOG_LIST_RESPONSE_MOCK,
  BLOG_RAW_ITEMS_MOCK,
  CAREER_ITEMS_MOCK,
  CAREER_LIST_RESPONSE_MOCK,
  CAREER_RAW_ITEMS_MOCK,
} from 'src/__mocks__';
import { BLOG_LOAD_LIST, blogLoadListSuccess, CAREER_LOAD_LIST, careerLoadListSuccess } from 'src/actions';
import { blogListAdapter } from 'src/adapter/blog';
import { careerListAdapter } from 'src/adapter/career';
import { loadBlogList as loadBlogListApi } from 'src/api/blog';
import { loadCareerList as loadCareerListApi } from 'src/api/career';
import { default as blogSaga, loadBlogList } from 'src/saga/blog';
import { default as careerSaga, loadCareerList } from 'src/saga/career';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('saga', () => {
  describe('blog', () => {
    it('loadBlogList', () => {
      (axios.get as jest.Mock).mockReturnValue(BLOG_LIST_RESPONSE_MOCK);
      testSaga(loadBlogList)
        .next()
        .call(loadBlogListApi)
        .next(BLOG_LIST_RESPONSE_MOCK)
        .call(blogListAdapter, BLOG_RAW_ITEMS_MOCK)
        .next(BLOG_ITEMS_MOCK)
        .put(blogLoadListSuccess(BLOG_ITEMS_MOCK))
        .next()
        .isDone();
    });

    it('blogSaga', () => {
      testSaga(blogSaga).next().takeEvery(BLOG_LOAD_LIST, loadBlogList).next().isDone();
    });
  });

  describe('career', () => {
    it('loadCareerList', () => {
      (axios.get as jest.Mock).mockReturnValue(CAREER_LIST_RESPONSE_MOCK);
      testSaga(loadCareerList)
        .next()
        .call(loadCareerListApi)
        .next(CAREER_LIST_RESPONSE_MOCK)
        .call(careerListAdapter, CAREER_RAW_ITEMS_MOCK)
        .next(CAREER_ITEMS_MOCK)
        .put(careerLoadListSuccess(CAREER_ITEMS_MOCK))
        .next()
        .isDone();
    });

    it('careerSaga', () => {
      testSaga(careerSaga).next().takeEvery(CAREER_LOAD_LIST, loadCareerList).next().isDone();
    });
  });
});
