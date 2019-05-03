/*
 *
 * Signup actions
 *
 */

import { DEFAULT_ACTION, SIGNUP_SUBMIT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function signUpSubmit(values, actions) {
  return {
    type: SIGNUP_SUBMIT,
    values,
    actions,
  };
}
