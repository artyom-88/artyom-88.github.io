import { AxiosResponse } from 'axios';
import { loadBlogList as loadBlogListApi } from 'features/blog/blog.api';
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import { blogListAdapter } from './blog.adapter';
import { blogLoadList, blogLoadListError, blogLoadListSuccess } from './blog.slice';
import { BlogDTO } from './blog.types';

export function* loadBlogList(): Generator<PutEffect | CallEffect> {
  try {
    const response = yield call(loadBlogListApi);
    const { data } = response as AxiosResponse<BlogDTO[]>;
    const items = yield call(blogListAdapter, data);
    yield put(blogLoadListSuccess(items));
  } catch (e) {
    const { message } = e as Error;
    console.log(`blogLoadListError: ${message}`);
    yield put(blogLoadListError(message));
  }
}

function* watchActions(): Generator<ForkEffect> {
  yield takeEvery(blogLoadList.type, loadBlogList);
}

export default watchActions;
