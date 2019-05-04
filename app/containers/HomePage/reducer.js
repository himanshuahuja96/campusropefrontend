/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SET_REDIRECT_TO_REFERRER,
  START_FETCHING_DATA,
  STOP_FETCHING_DATA,
  OPEN_SNACK,
  CLOSE_SNACK,
  SET_REDIRECT_ACTION,
} from './constants';

export const initialState = {
  redirectToReferrer: false,
  isFetchingData: false,
  snackData: {
    opened: false,
    message: 'success',
    variant: 'success',
  },
  redirectAction: null,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_REDIRECT_TO_REFERRER:
        draft.redirectToReferrer = action.bool;
        break;
      case START_FETCHING_DATA:
        draft.isFetchingData = true;
        break;
      case STOP_FETCHING_DATA:
        draft.isFetchingData = false;
        break;
      case SET_REDIRECT_ACTION:
        draft.redirectAction = action.redirectAction;
        break;
      case OPEN_SNACK:
        draft.snackData.opened = true;
        draft.snackData.message = action.message;
        draft.snackData.variant = action.variant;
        break;
      case CLOSE_SNACK:
        draft.snackData.opened = false;
        break;
    }
  });

export default homePageReducer;
