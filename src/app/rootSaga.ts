import blogSaga from 'features/blog/blog.saga';
import careerSaga from 'features/career/career.saga';
import { all, AllEffect, ForkEffect } from 'redux-saga/effects';

export default function* (): Generator<AllEffect<Generator<ForkEffect>>> {
  yield all([blogSaga(), careerSaga()]);
}
