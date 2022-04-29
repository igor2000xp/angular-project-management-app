import * as TaskActions from '../actions/task.actions';
// import {createTaskAction, deleteTaskAction, getTasksAction, updateTaskAction} from "../actions/app.actions";
import {Action, createReducer, on} from "@ngrx/store";
import {IAppState, initialState} from "../state.models";

const reducer = createReducer(initialState,
  on(TaskActions.getTasksAction, state => {
    console.log('!!! state', state);
    return {...state};
  }),
  on(TaskActions.getTaskAction, state => {
    console.log('!!! state', state);
    return {...state};
  }),
  on(TaskActions.createTaskAction, state => {
      console.log('!!! state', state);
      return {...state};
    }),
  on(TaskActions.updateTaskAction, state => {
    console.log('!!! state', state);
    return {...state};
  }),

  on(TaskActions.deleteTaskAction, state => {
    console.log('!!! state', state);
    return {...state};
  }),
);

export function taskReducer (state: IAppState, action: Action) {
  return reducer(state, action);
};

