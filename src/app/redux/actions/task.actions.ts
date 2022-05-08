import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/auth/models/Task.model';
import { InfoForTask } from '../effects/task.effects';
import { ITask } from '../state.models';

const actionSource = '[TASK]';

export const getTasksAction = createAction(
  `${actionSource} GET ALL CURRENT TASKS`,
  props<{ boardID:string, columnID:string, task:Task }>(),
);
export const getTasksActionSuccess = createAction(
  `${actionSource} GET ALL CURRENT USER, SUCCESS`,
  props<{ tasks:Task[] }>(),
);
export const createTaskAction = createAction(
  `${actionSource} CREATE A TASK`,
  props<{ info: InfoForTask }>(),
);
export const createTaskActionSuccess = createAction(
  `${actionSource} CREATE A TASK, SUCCESS`,
  props<{ currentTask:Task }>(),
);

export const updateTaskAction = createAction(
  `${actionSource} UPDATE THE TASK`,
  props<{ info: InfoForTask }>(),
);
export const updateTaskActionSuccess = createAction(
  `${actionSource} UPDATE THE TASK, SUCCESS`,
  props<{ task:Task }>(),
);
export const deleteTaskAction = createAction(
  `${actionSource} DELETE THE TASK`,
  props<{ info: InfoForTask }>(),
);
export const deleteTaskActionSuccess = createAction(
  `${actionSource} DELETE THE TASK, SUCCESS`,
  props<{ task:ITask }>(),
);
export const getTasksByIdAction = createAction(
  `${actionSource} GET TASK BY ID`,
  props<{ info: InfoForTask }>(),
);
export const getTasksByIdActionSuccess = createAction(
  `${actionSource} GET TASK BY ID SUCCESS`,
  props<{ task:Task }>(),
);
