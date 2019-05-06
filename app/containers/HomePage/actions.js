/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_REDIRECT_TO_REFERRER,
  HOME_MOUNTED,
  START_FETCHING_DATA,
  STOP_FETCHING_DATA,
  CHANGE_ROUTE,
  OPEN_SNACK,
  CLOSE_SNACK,
  SET_REDIRECT_ACTION,
  ROUTE_TO_USER_PROFILE,
} from './constants';

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

export function homeMounted() {
  return {
    type: HOME_MOUNTED,
  };
}

export function startFetchingData() {
  return {
    type: START_FETCHING_DATA,
  };
}

export function stopFetchingData() {
  return {
    type: STOP_FETCHING_DATA,
  };
}

export function changeRoute(routingAction) {
  return {
    type: CHANGE_ROUTE,
    routingAction,
  };
}
export function setRedirectAction(redirectAction) {
  return {
    type: SET_REDIRECT_ACTION,
    redirectAction,
  };
}

export function routeToUserProfile(userId = null) {
  return {
    type: ROUTE_TO_USER_PROFILE,
    userId,
  };
}

export function openSnack(variant, message) {
  return {
    type: OPEN_SNACK,
    variant,
    message,
  };
}

export function closeSnack() {
  return {
    type: CLOSE_SNACK,
  };
}
