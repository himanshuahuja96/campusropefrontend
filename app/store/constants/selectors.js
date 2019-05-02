import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the constants state domain
 */

const selectConstantsDomain = state => state.constants || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Constants
 */

const makeSelectConstants = () =>
  createSelector(
    selectConstantsDomain,
    substate => substate,
  );

export default makeSelectConstants;
export { selectConstantsDomain };
