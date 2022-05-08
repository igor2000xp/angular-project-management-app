import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IColumnState } from '../state.models';

export const selectColumn = createFeatureSelector<IColumnState>('column-state');

export const selectAllColumns = createSelector(selectColumn, (state:IColumnState) => {
  return state.columns;
});

export const selectCreateColumn = createSelector(selectColumn, (state:IColumnState) => {
  return state.columns;
});

export const selectCurrentColumn = createSelector(selectColumn, (state:IColumnState) => {
  return state.currentColumn;
});

export const selectDeleteColumn = createSelector(selectColumn, (state:IColumnState) => {
  return state.columns;
});

export const selectUpdateColumn = createSelector(selectColumn, (state:IColumnState) => {
  return state.columns;
});
