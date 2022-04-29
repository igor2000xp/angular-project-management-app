import { createAction, props } from "@ngrx/store";
import { ITask } from "../state.model";

export const getTasksAction = createAction('' +
  '[TASKS] GET ALL CURRENT TASKS'
);
export const getTaskAction = createAction('' +
  '[TASKS] GET TASK BY ID'
);
export const createTaskAction = createAction('' +
  '[TASKS] CREATE A TASK'
);
export const updateTaskAction = createAction('' +
  '[TASKS] UPDATE THE TASK'
);
export const deleteTaskAction = createAction('' +
  '[TASKS] DELETE THE TASK'
);
