import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectHomeDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectHome = () =>
  createSelector(
    selectHomeDomain,
    substate => substate,
  );

const makeSelectIsFetchingData = () =>
  createSelector(
    selectHomeDomain,
    substate => substate.isFetchingData,
  );

const makeSelectSnackData = () =>
  createSelector(
    selectHomeDomain,
    substate => substate.snackData,
  );

const makeSelectRedirectAction = () =>
  createSelector(
    selectHomeDomain,
    substate => substate.redirectAction,
  );

export default makeSelectHome;
export {
  selectHomeDomain,
  makeSelectIsFetchingData,
  makeSelectSnackData,
  makeSelectRedirectAction,
};
