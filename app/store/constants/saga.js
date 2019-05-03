import { takeLatest, put } from 'redux-saga/effects';
import { constantsService } from '../../feathers';
import { FETCH_CONSTANTS } from './constants';
import { setConstants } from './actions';

export function* fetchConstantsSaga() {
  const constants = yield constantsService.find();
  yield put(setConstants(constants));
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(FETCH_CONSTANTS, fetchConstantsSaga);
}
