import { BLOG_ITEMS_MOCK, BLOG_LIST_RESPONSE_MOCK, BLOG_RAW_ITEMS_MOCK } from '__mocks__/blog.mock';
import { blogListAdapter } from 'features/blog/blog.adapter';
import * as blogApi from 'features/blog/blog.api';
import { default as blogSaga, loadBlogList } from 'features/blog/blog.saga';
import { blogLoadList, blogLoadListSuccess } from 'features/blog/blog.slice';
import { testSaga } from 'redux-saga-test-plan';

jest.mock('features/blog/blog.api', () => ({
  loadBlogList: jest.fn(),
}));

describe('blog saga', () => {
  it('loadBlogList', () => {
    (blogApi.loadBlogList as jest.Mock).mockReturnValue(BLOG_LIST_RESPONSE_MOCK);
    testSaga(loadBlogList)
      .next()
      .call(blogApi.loadBlogList)
      .next(BLOG_LIST_RESPONSE_MOCK)
      .call(blogListAdapter, BLOG_RAW_ITEMS_MOCK)
      .next(BLOG_ITEMS_MOCK)
      .put(blogLoadListSuccess(BLOG_ITEMS_MOCK))
      .next()
      .isDone();
  });

  it('blogSaga', () => {
    testSaga(blogSaga).next().takeEvery(blogLoadList.type, loadBlogList).next().isDone();
  });
});
