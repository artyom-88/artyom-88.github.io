import blogMock from 'assets/data/blog.json';
import { AxiosResponse } from 'axios';
import blogApi from 'features/blog/blog.api';
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import { blogListAdapter } from './blog.adapter';
import { actions } from './blog.slice';
import { BlogDTO, BlogModel } from './blog.types';

export function* loadBlogList(): Generator<PutEffect | CallEffect> {
  try {
    const response = yield call(blogApi.loadBlogList);
    const { data } = response as AxiosResponse<BlogDTO[]>;
    const items = yield call(blogListAdapter, data);
    yield put(actions.loadListSuccess(items as BlogModel[]));
  } catch (e) {
    const { message } = e as Error;
    console.log(`blogLoadListError: ${message}`);
    // TODO: temporary solution because of Heroku free plan cancel
    //  https://devcenter.heroku.com/articles/usage-and-billing
    // yield put(actions.loadListError(message));
    const items = yield call(blogListAdapter, blogMock as BlogDTO[]);
    yield put(actions.loadListSuccess(items as BlogModel[]));
  }
}

function* watchActions(): Generator<ForkEffect> {
  yield takeEvery(actions.loadList.type, loadBlogList);
}

export default watchActions;
