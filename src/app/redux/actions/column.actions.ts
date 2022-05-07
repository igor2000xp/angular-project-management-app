import { createAction, props } from '@ngrx/store';
import { IColumn } from '../state.models';

const actionsColumn = '[COLUMN]';

export const createColumn = createAction(
  `${actionsColumn} CREATE COLUMN`,
  props<{ column: IColumn }>(),
);

export const getAllColumns = createAction(
  `${actionsColumn} GET ALL COLUMNS`,
  props<{ columns: IColumn[] }>(),
);

export const getColumnById = createAction(
  `${actionsColumn} GET COLUMN BY ID`,
  props<{ column: IColumn }>(),
);

export const deleteColumn = createAction(
  `${ actionsColumn } DELETE COLUMN`,
  props<{ column:IColumn }>(),
);

export const updateColumn = createAction(
  `${ actionsColumn } UPDATE COLUMN`,
  props<{ column: IColumn }>(),
);
