/* eslint-disable ngrx/on-function-explicit-return-type */
import { Action, createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/auth/models/Task.model';
import * as TaskActions from '../actions/task.actions';

export interface ITasksState {
  tasks: Task[] | null;
  allTasks?: Task[];
  currentTask: Task | null;
  isTaskFetched: boolean;
}
export const initialTaskState:ITasksState = {
  tasks: null,
  allTasks: null,
  currentTask: null,
  isTaskFetched: false,
};

const tReducer = createReducer(
  initialTaskState,
  on(TaskActions.getTasksActionSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    isTaskFetched: false,
  })),
  on(TaskActions.getTasksByIdActionSuccess, (state, { task }) => ({
    ...state,
    currentTask: task,
    isTaskFetched: false,
  })),
  on(TaskActions.setTasksFromArraySuccess, (state, { allTasks }) => ({
    ...state,
    allTasks: allTasks,
  })),
);

export function taskReducer(state: ITasksState, action: Action) {
  return tReducer(state, action);
}
