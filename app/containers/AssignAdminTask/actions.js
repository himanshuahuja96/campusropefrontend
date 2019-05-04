/*
 *
 * AssignAdminTask actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_ADMIN_TASKS_OF_GIVEN_USER,
  SET_ADMIN_TASKS,
  TOGGLE_ADMIN_TASK_SELECTION,
  SAVE_ADMIN_TASKS,
  CLEAR_TASKS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchAdminTasksOfGivenUser(userId) {
  return {
    type: FETCH_ADMIN_TASKS_OF_GIVEN_USER,
    userId,
  };
}

export function toggleAdminTaskSelection(taskId) {
  return {
    type: TOGGLE_ADMIN_TASK_SELECTION,
    taskId,
  };
}

export function setAdminTasks(tasks) {
  return {
    type: SET_ADMIN_TASKS,
    adminTaskInfo: tasks,
  };
}

export function saveAdminTasks() {
  return {
    type: SAVE_ADMIN_TASKS,
  };
}

export function clearTasks() {
  return {
    type: CLEAR_TASKS,
  };
}
