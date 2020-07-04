import { BLOG_LOAD_LIST, blogLoadListError, blogLoadListSuccess } from 'actions';
import { blogListAdapter } from 'adapter/blog';
import { loadBlogList as loadBlogListApi } from 'api/blog';
import { AxiosResponse } from 'axios';
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import { IBlogRawData } from 'types';

export function* loadBlogList(): Generator<PutEffect | CallEffect> {
  try {
    const response = yield call(loadBlogListApi);
    const { data } = response as AxiosResponse<IBlogRawData[]>;
    const items = yield call(blogListAdapter, data);
    yield put(blogLoadListSuccess(items));
  } catch (e) {
    const { message } = e;
    console.log(`blogLoadListError: ${message}`);
    yield put(blogLoadListError(message));
  }
}

function* watchActions(): Generator<ForkEffect> {
  yield takeEvery(BLOG_LOAD_LIST, loadBlogList);
}

export default watchActions;
