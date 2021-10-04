import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import { default as blogSaga } from '../features/blog/blog.saga';
import { default as careerSaga } from '../features/career/career.saga';

export default function* (): Generator<AllEffect<Generator<ForkEffect>>> {
  yield all([blogSaga(), careerSaga()]);
}
