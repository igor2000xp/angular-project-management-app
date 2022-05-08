import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IColumnState } from '../state.models';

const selectColumn = createFeatureSelector<IColumnState>('columns');

export const selectColumns = createSelector(
  selectColumn,
  (state:IColumnState) => state.columns,
);
