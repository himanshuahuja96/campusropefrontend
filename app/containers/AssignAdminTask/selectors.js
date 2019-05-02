import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the assignAdminTask state domain
 */

const selectAssignAdminTaskDomain = state =>
  state.assignAdminTask || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AssignAdminTask
 */

const makeSelectAssignAdminTask = () =>
  createSelector(
    selectAssignAdminTaskDomain,
    substate => substate,
  );

export default makeSelectAssignAdminTask;
export { selectAssignAdminTaskDomain };
