/*
 *
 * AssignAdminTask reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SET_ADMIN_TASKS,
  TOGGLE_ADMIN_TASK_SELECTION,
  FETCH_ADMIN_TASKS_OF_GIVEN_USER,
  CLEAR_TASKS,
} from './constants';

export const initialState = {
  tasks: [],
  selectedUser: '',
};

/* eslint-disable default-case, no-param-reassign */
const assignAdminTaskReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      case SET_ADMIN_TASKS:
        draft.tasks = action.adminTaskInfo.tasks;
        break;

      case CLEAR_TASKS:
        draft.tasks = [];
        break;

      case FETCH_ADMIN_TASKS_OF_GIVEN_USER:
        draft.selectedUser = action.userId;
        break;

      case TOGGLE_ADMIN_TASK_SELECTION:
        // eslint-disable-next-line no-case-declarations
        const indexOfListToUpdate = state.tasks.findIndex(
          task => task.id === action.taskId,
        );
        draft.tasks = state.tasks.map((task, i) => {
          if (i === indexOfListToUpdate) {
            return {
              ...task,
              selected: !task.selected,
            };
          }
          return task;
        });
    }
  });

export default assignAdminTaskReducer;
