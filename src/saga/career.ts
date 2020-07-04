import { CAREER_LOAD_LIST, careerLoadListError, careerLoadListSuccess } from 'actions';
import { careerListAdapter } from 'adapter/career';
import { loadCareerList as loadCareerListApi } from 'api/career';
import { AxiosResponse } from 'axios';
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import { ICareerRawData } from 'types';

export function* loadCareerList(): Generator<PutEffect | CallEffect> {
  try {
    const response = yield call(loadCareerListApi);
    const { data } = response as AxiosResponse<ICareerRawData[]>;
    const items = yield call(careerListAdapter, data);
    yield put(careerLoadListSuccess(items));
  } catch (e) {
    const { message } = e;
    console.log(`careerLoadListError: ${message}`);
    yield put(careerLoadListError(message));
  }
}

export function* watchActions(): Generator<ForkEffect> {
  yield takeEvery(CAREER_LOAD_LIST, loadCareerList);
}

export default watchActions;
