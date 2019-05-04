import { takeLatest, call, put, select } from 'redux-saga/effects';
import { FETCH_ADMIN_TASKS_OF_GIVEN_USER, SAVE_ADMIN_TASKS } from './constants';
import { getAdminTasksForUser, saveAdminTasksApi } from './api';
import { setAdminTasks } from './actions';
import { selectAdminTaskDomain } from './selectors';

export function* fetchAdminTask({ userId }) {
  const adminTasks = yield call(getAdminTasksForUser, userId);
  yield put(setAdminTasks(adminTasks));
}

export function* saveAdminTaskToDB() {
  const { tasks, selectedUser } = yield select(selectAdminTaskDomain);
  yield call(saveAdminTasksApi, { tasks, selectedUser });
}
// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(FETCH_ADMIN_TASKS_OF_GIVEN_USER, fetchAdminTask),
    takeLatest(SAVE_ADMIN_TASKS, saveAdminTaskToDB),
  ];
}
