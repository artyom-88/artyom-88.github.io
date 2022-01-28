import { AxiosResponse } from 'axios';
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import contactApi from './contact.api';
import { actions } from './contact.slice';
import { ContactModel } from './contact.types';

export function* loadContactListSaga(): Generator<PutEffect | CallEffect> {
  try {
    const response = yield call(contactApi.loadContactList);
    const { data } = response as AxiosResponse<ContactModel[]>;
    yield put(actions.loadListSuccess(data));
  } catch (e) {
    const { message } = e as Error;
    console.log(`loadContactListError: ${message}`);
    yield put(actions.loadListError(message));
  }
}

export function* watchActions(): Generator<ForkEffect> {
  yield takeEvery(actions.loadList.type, loadContactListSaga);
}

export default watchActions;
