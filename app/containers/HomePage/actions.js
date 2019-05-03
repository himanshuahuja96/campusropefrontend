/*
 *
 * HomePage actions
 *
 */

import { DEFAULT_ACTION, SET_REDIRECT_TO_REFERRER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setRedirectToReferrer(bool) {
  return {
    type: SET_REDIRECT_TO_REFERRER,
    bool,
  };
}
