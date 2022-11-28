import careerMock from 'assets/data/career.json';
import { AxiosResponse } from 'axios';
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import { careerListAdapter } from './career.adapter';
import careerApi from './career.api';
import { actions } from './career.slice';
import { CareerDTO, CareerModel } from './career.types';

export function* loadCareerListSaga(): Generator<PutEffect | CallEffect> {
  try {
    const response = yield call(careerApi.loadCareerList);
    const { data } = response as AxiosResponse<CareerDTO[]>;
    const items = yield call(careerListAdapter, data);
    yield put(actions.loadListSuccess(items as CareerModel[]));
  } catch (e) {
    const { message } = e as Error;
    console.log(`careerLoadListError: ${message}`);
    // TODO: temporary solution because of Heroku free plan cancel
    //  https://devcenter.heroku.com/articles/usage-and-billing
    // yield put(actions.loadListError(message));
    const items = yield call(careerListAdapter, careerMock as CareerDTO[]);
    yield put(actions.loadListSuccess(items as CareerModel[]));
  }
}

export function* watchActions(): Generator<ForkEffect> {
  yield takeEvery(actions.loadList.type, loadCareerListSaga);
}

export default watchActions;
