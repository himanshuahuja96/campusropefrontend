/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SET_REDIRECT_TO_REFERRER } from './constants';

export const initialState = {
  redirectToReferrer: false,
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
    }
  });

export default homePageReducer;
