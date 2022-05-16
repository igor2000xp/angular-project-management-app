import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITasksState } from '../reducers';

const selectTask = createFeatureSelector<ITasksState>('tasks');

export const selectTasks = createSelector(
  selectTask,
  (state:ITasksState) => state.tasks,
);
export const selectAllTasks = createSelector(
  selectTask,
  (state:ITasksState) => state.allTasks,
);
