import { AxiosResponse } from 'axios';
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import { careerListAdapter } from './career.adapter';
import { loadCareerList as loadCareerListApi } from './career.api';
import { careerLoadList, careerLoadListError, careerLoadListSuccess } from './career.slice';
import { CareerDTO } from './career.types';

export function* loadCareerList(): Generator<PutEffect | CallEffect> {
  try {
    const response = yield call(loadCareerListApi);
    const { data } = response as AxiosResponse<CareerDTO[]>;
    const items = yield call(careerListAdapter, data);
    yield put(careerLoadListSuccess(items));
  } catch (e) {
    const { message } = e as Error;
    console.log(`careerLoadListError: ${message}`);
    yield put(careerLoadListError(message));
  }
}

export function* watchActions(): Generator<ForkEffect> {
  yield takeEvery(careerLoadList.type, loadCareerList);
}

export default watchActions;
