import { Action, createReducer, on } from '@ngrx/store';
import { ITask } from '../state.models';
import * as TaskActions from '../actions/task.actions';

export interface ITaskState {
  task: ITask | null;
  isTaskFetched: boolean;
}
export const initialTaskState:ITaskState = {
  task: null,
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
    return {...state};
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
      return {...state};
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
    return {...state};
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
    return {...state};
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

export function taskReducer (state: ITaskState, action: Action) {
  return tReducer(state, action);
}

