import { createSelector } from 'reselect';

/**
 * Direct selector to the adminTask state domain
 */

const selectAdminTaskDomain = state => state.adminTask;

/**
 * Other specific selectors
 */

const makeSelectAdminTask = () =>
  createSelector(
    selectAdminTaskDomain,
    substate => substate.tasks,
  );

const makeSelectSelectedAdminTask = () =>
  createSelector(
    selectAdminTaskDomain,
    state => state.tasks.filter(task => task.selected),
  );

export default makeSelectAdminTask;
export {
  selectAdminTaskDomain,
  makeSelectAdminTask,
  makeSelectSelectedAdminTask,
};
