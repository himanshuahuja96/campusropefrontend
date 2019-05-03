/* eslint-disable no-underscore-dangle */
import { createSelector } from 'reselect';
import ls from 'local-storage';
import {
  userDrawerMenus,
  adminDrawerMenus,
  adminHomeMenus,
  userHomeMenus,
} from './menus';
import { USER_TOKEN } from '../../constants/local_storage_constants';

const ADMIN_TASK_MENU_ID = 3;
const USER_DRAWER_MENU = userDrawerMenus;

const selectLoggedUserDomain = state => state.loggedUser;

const makeSelectLoggedUser = () =>
  createSelector(
    selectLoggedUserDomain,
    loggedUser => loggedUser.user,
  );

const makeSelectLoggedUserMenus = () =>
  createSelector(
    selectLoggedUserDomain,
    loggedUserState => {
      if (loggedUserState.user && loggedUserState.user.role === 'user') {
        setSubMenusForUserMenus(loggedUserState);
        return userDrawerMenus;
      }
      if (loggedUserState.user && loggedUserState.user.role === 'admin') {
        return adminDrawerMenus;
      }
      return [];
    },
  );

const makeSelectLoggedUserHomeMenus = () =>
  createSelector(
    selectLoggedUserDomain,
    loggedUserState => {
      if (loggedUserState.user && loggedUserState.user.role === 'user') {
        return userHomeMenus;
      }
      if (loggedUserState.user && loggedUserState.user.role === 'admin') {
        return adminHomeMenus;
      }
      return userHomeMenus;
    },
  );

const makeSelectIsLoggedUser = userId =>
  createSelector(
    selectLoggedUserDomain,
    loggedUser => loggedUser.user._id === userId,
  );

const isLoggedIn = () => ls.get(USER_TOKEN);

const setSubMenusForUserMenus = loggedUserState => {
  USER_DRAWER_MENU.forEach(menu => {
    if (menu.id === ADMIN_TASK_MENU_ID) {
      // eslint-disable-next-line no-param-reassign
      menu.subMenus = loggedUserState.user.admintasks.tasks.filter(
        s => s.selected,
      );
    }
  });
};

export default makeSelectLoggedUser;
export {
  selectLoggedUserDomain,
  makeSelectLoggedUser,
  makeSelectLoggedUserMenus,
  makeSelectLoggedUserHomeMenus,
  makeSelectIsLoggedUser,
  isLoggedIn,
  ADMIN_TASK_MENU_ID,
};
