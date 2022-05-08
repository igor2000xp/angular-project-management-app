import { Action, createReducer, on } from '@ngrx/store';
import { IColumnState } from '../state.models';
import * as ColumnAction from '../actions/column.actions';

const initialReducer:IColumnState = {
  columns: null,
  currentColumn: null,
}

export const reducer = createReducer(
  initialReducer,
  on(ColumnAction.createColumn, (state) => {
    return ({
      ...state,
    });
  }),
  on(ColumnAction.getAllColumns, (state) => {
    return ({
      ...state,
    });
  }),
  on(ColumnAction.getColumnById, (state) => {
    return ({
      ...state,
    });
  }),
  on(ColumnAction.deleteColumn, (state) => {
    return ({
      ...state,
    });
  }),
  on(ColumnAction.updateColumn, (state) => {
    return ({
      ...state,
    });
  }),
);

export function ColumnReducer(state:IColumnState, action:Action) {
  return reducer(state, action);
}
