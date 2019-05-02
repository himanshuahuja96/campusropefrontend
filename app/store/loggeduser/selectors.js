import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loggeduser state domain
 */

const selectLoggeduserDomain = state => state.loggeduser || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Loggeduser
 */

const makeSelectLoggeduser = () =>
  createSelector(
    selectLoggeduserDomain,
    substate => substate,
  );

export default makeSelectLoggeduser;
export { selectLoggeduserDomain };
