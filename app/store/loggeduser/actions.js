/*
 *
 * Loggeduser actions
 *
 */

import { DEFAULT_ACTION, SET_LOGGED_USER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setLoggedUser(user) {
  return {
    type: SET_LOGGED_USER,
    user,
  };
}
