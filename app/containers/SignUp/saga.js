import { call, put, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import { SIGNUP_SUBMIT, EMAIL_ALREADY_EXISTS_MESSGE } from './constants';
import { storeToken } from '../Login/saga';
import { setLoggedUser } from '../../store/loggeduser/actions';
import { fetchConstants } from '../../store/constants/actions';
import feathersClient, { userService } from '../../feathers';

export function* submitSignupDetails({ values, actions }) {
  const { resetForm, setErrors, setSubmitting } = actions;
  try {
    yield userService.create(values);
    const response = yield call(feathersClient.authenticate, {
      strategy: 'local',
      email: values.email,
      password: values.password,
    });

    const payload = yield feathersClient.passport.verifyJWT(
      response.accessToken,
    );
    const loggedUser = yield userService.get(payload.userId);
    feathersClient.set('user', loggedUser);
    // Reset the form just to be clean, then send the user to our home  which "requires" authentication
    yield call(resetForm);
    yield put(setLoggedUser(loggedUser));
    yield put(fetchConstants());
    yield call(storeToken, response.accessToken);
    yield put(replace('/'));
  } catch (e) {
    if (e.response.status === 409) {
      yield call(setErrors, {
        exists: EMAIL_ALREADY_EXISTS_MESSGE,
      });
    }

    yield call(setSubmitting, false);
  }
}

export default function* defaultSaga() {
  yield takeLatest(SIGNUP_SUBMIT, submitSignupDetails);
}
