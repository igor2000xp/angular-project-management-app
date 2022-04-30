import { createAction, props } from '@ngrx/store';
import { ITask } from '../state.models';

const actionSource = '[TASK]';

export const getTasksAction = createAction(
  `${actionSource} GET ALL CURRENT TASKS`,
);
export const getTasksActionSuccess = createAction(
  `${actionSource} GET ALL CURRENT USER, SUCCESS`,
  props<{task:ITask}>(),
);
export const getTasksActionFailed = createAction(
  `${actionSource} GET ALL CURRENT USER, FAILED`
);

export const getTaskAction = createAction(
  `${actionSource} GET TASK BY ID`,
);
export const getTaskActionSuccess = createAction(
  `${actionSource} GET TASK BY ID, SUCCESS`,
  props<{task:ITask}>(),
);
export const getTaskActionFailed = createAction(
  `${actionSource} GET TASK BY ID, FAILED`
);

export const createTaskAction = createAction(
  `${actionSource} CREATE A TASK`,
);
export const createTaskActionSuccess = createAction(
  `${actionSource} CREATE A TASK, SUCCESS`,
  props<{task:ITask}>(),
);
export const createTaskActionFailed = createAction(
  `${actionSource} CREATE A TASK, FAILED`
);

export const updateTaskAction = createAction(
  `${actionSource} UPDATE THE TASK`
);
export const updateTaskActionSuccess = createAction(
  `${actionSource} UPDATE THE TASK, SUCCESS`,
  props<{task:ITask}>(),
);
export const updateTaskActionFailed = createAction(
  `${actionSource} UPDATE THE TASK, FAILED`
);

export const deleteTaskAction = createAction(
  `${actionSource} DELETE THE TASK`,
);
export const deleteTaskActionSuccess = createAction(
  `${actionSource} DELETE THE TASK, SUCCESS`,
  props<{task:ITask}>(),
);
export const deleteTaskActionFailed = createAction(
  `${actionSource} DELETE THE TASK, FAILED`
);
