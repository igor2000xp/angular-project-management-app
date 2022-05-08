/* eslint-disable ngrx/on-function-explicit-return-type */
import { Action, createReducer, on } from '@ngrx/store';
import { ITask } from '../state.models';
import * as TaskActions from '../actions/task.actions';

export interface ITasksState {
  tasks: ITask[] | null;
  currentTask: ITask | null;
  isTaskFetched: boolean;
}
export const initialTaskState:ITasksState = {
  tasks: null,
  currentTask: null,
  isTaskFetched: false,
};

const tReducer = createReducer(
  initialTaskState,
  on(TaskActions.getTasksAction, state => {
    console.log('!!! state', state);
    return ({
      ...state,
    });
  }),
  on(TaskActions.getTasksActionSuccess, (state, { task }) => ({
    ...state,
    task,
    isTaskFetched: false,
  })),
  on(TaskActions.getTasksActionFailed, state => {
    console.log('!!! state', state);
    return ({
      ...state,
    });
  }),
  on(TaskActions.getTaskAction, state => {
    console.log('!!! state', state);
    return { ...state };
  }),
  on(TaskActions.getTaskActionSuccess, (state, { task }) => ({
    ...state,
    task,
    isTaskFetched: false,
  })),
  on(TaskActions.getTaskActionFailed, state => {
    console.log('!!! state', state);
    return ({
      ...state,
    });
  }),
  on(TaskActions.createTaskAction, state => {
    console.log('!!! state', state);
    return { ...state };
  }),
  on(TaskActions.createTaskActionSuccess, (state, { task }) => ({
    ...state,
    task,
    isTaskFetched: false,
  })),
  on(TaskActions.createTaskActionFailed, state => {
    console.log('!!! state', state);
    return ({
      ...state,
    });
  }),
  on(TaskActions.updateTaskAction, state => {
    console.log('!!! state', state);
    return { ...state };
  }),
  on(TaskActions.updateTaskActionSuccess, (state, { task }) => ({
    ...state,
    task,
    isTaskFetched: false,
  })),
  on(TaskActions.updateTaskActionFailed, state => {
    console.log('!!! state', state);
    return ({
      ...state,
    });
  }),
  on(TaskActions.deleteTaskAction, state => {
    console.log('!!! state', state);
    return { ...state };
  }),
  on(TaskActions.deleteTaskActionSuccess, (state, { task }) => ({
    ...state,
    task,
    isTaskFetched: false,
  })),
  on(TaskActions.deleteTaskActionFailed, state => {
    console.log('!!! state', state);
    return ({
      ...state,
    });
  }),
);

export function taskReducer(state: ITasksState, action: Action) {
  return tReducer(state, action);
}

