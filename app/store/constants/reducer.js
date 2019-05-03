/* eslint-disable no-unused-vars */
/*
 *
 * Constants reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SET_CONSTANTS } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const constantsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_CONSTANTS:
        draft = action.constants;
        break;
    }
  });

export default constantsReducer;
