/* eslint-disable ngrx/on-function-explicit-return-type */
import { Action, createReducer, on } from '@ngrx/store';
import { IColumnState } from '../state.models';
import * as ColumnAction from '../actions/column.actions';

const initialReducer:IColumnState = {
  columns: null,
  currentColumn: null,
};

export const reducer = createReducer(
  initialReducer,

  on(ColumnAction.getColumnsSuccess, (state, { columns }) => {
    return ({
      ...state,
      columns: columns,
    });
  }),
  on(ColumnAction.getColumnByIdSuccess, (state, { column }) => {
    return ({
      ...state,
      currentColumn: column,
    });
  }),
);

export function ColumnReducer(state:IColumnState, action:Action) {
  return reducer(state, action);
}
