import getInjectors from './utils/sagaInjectors';
import constantsSaga from './store/constants/saga';
import LoginSaga from './containers/Login/saga';
import { DAEMON } from './utils/constants';

export default function injectRootSagas(store) {
  const { injectSaga } = getInjectors(store);

  injectSaga('constants', {
    saga: constantsSaga,
    mode: DAEMON,
  });

  injectSaga('login', {
    saga: LoginSaga,
    mode: DAEMON,
  });
}
