import { createAction, props } from '@ngrx/store';
import { Column } from 'src/app/auth/models/Column.model';
import { InfoForColumn } from '../effects/column.effects';

const actionsColumn = '[COLUMN]';

export const createColumn = createAction(
  `${actionsColumn} CREATE COLUMN`,
  props<{ column: Column }>(),
);

export const getColumns = createAction(
  `${actionsColumn} GET ALL COLUMNS`,
  props<{ info: InfoForColumn }>(),
);

export const getColumnsSuccess = createAction(
  `${actionsColumn} GET ALL COLUMNS SUCCESS`,
  props<{ columns: Column[] }>(),
);

export const getColumnById = createAction(
  `${actionsColumn} GET COLUMN BY ID`,
  props<{ info: InfoForColumn }>(),
);

export const getColumnByIdSuccess = createAction(
  `${actionsColumn} GET COLUMN BY ID SUCCESS`,
  props<{ column: Column }>(),
);

export const deleteColumn = createAction(
  `${ actionsColumn } DELETE COLUMN`,
  props<{ info: InfoForColumn  }>(),
);

export const updateColumn = createAction(
  `${ actionsColumn } UPDATE COLUMN`,
  props<{ info: InfoForColumn }>(),
);
