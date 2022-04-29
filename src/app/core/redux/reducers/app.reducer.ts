import * as TaskActions from '../actions/app.actions';
import {createReducer, on} from "@ngrx/store";
import {initialState} from "../state.model";
import {createTaskAction, deleteTaskAction, getTasksAction, updateTaskAction} from "../actions/app.actions";

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



