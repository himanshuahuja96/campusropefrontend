/*
 *
 * Loggeduser reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SET_LOGGED_USER } from './constants';

export const initialState = {
  user: {},
};

/* eslint-disable default-case, no-param-reassign */
const loggeduserReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_LOGGED_USER:
        draft.user = action.user;
        break;
    }
  });

export default loggeduserReducer;
