import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import { default as blogSaga } from './blog';
import { default as careerSaga } from './career';

export default function* (): Generator<AllEffect<Generator<ForkEffect>>> {
  yield all([blogSaga(), careerSaga()]);
}
