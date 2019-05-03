/*
 *
 * Constants actions
 *
 */

import { DEFAULT_ACTION, SET_CONSTANTS, FETCH_CONSTANTS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setConstants(constants) {
  return {
    type: SET_CONSTANTS,
    constants,
  };
}

export function fetchConstants() {
  return {
    type: FETCH_CONSTANTS,
  };
}
