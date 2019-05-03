import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ls from 'local-storage';
import {
  LOGIN_FORM_SUBMIT,
  NON_EXIST_EMAIL_PASSWORD_ERROR_MESSAGE,
  LOGOUT,
} from './constants';
import { USER_TOKEN } from '../../constants/local_storage_constants';
import { setLoggedUser } from '../../store/loggeduser/actions';
import { fetchConstants } from '../../store/constants/actions';
import feathersClient, { userService } from '../../feathers';

// Function for storing our API token, perhaps in localStorage or Redux state.
export function* storeToken(token) {
  ls.set(USER_TOKEN, token);
}

export function* logout() {
  ls.remove(USER_TOKEN);
  yield call(feathersClient.logout);
  yield put(push('/'));
}

// Our SUBMIT_LOGIN action passes along the form values as the payload and form actions as
// meta data. This allows us to not only use the values to do whatever API calls and such
// we need, but also to maintain control flow here in our saga.
function* submitLogin({ values, actions }) {
  const { resetForm, setErrors, setSubmitting } = actions;
  try {
    // Connect to our "API" and get an API token for future API calls.
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
    yield put(push('/'));
  } catch (e) {
    if (e.response.status === 401) {
      // If our API throws an error we will leverage Formik's existing error system to pass it along
      // to the view layer, as well as clearing the loading indicator.
      yield call(setErrors, {
        authentication: NON_EXIST_EMAIL_PASSWORD_ERROR_MESSAGE,
      });
    }
    yield call(setSubmitting, false);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(LOGIN_FORM_SUBMIT, submitLogin),
    takeLatest(LOGOUT, logout),
  ];
}
