import { createAction, props } from '@ngrx/store';
import { IBoard } from '../state.models';

const actionsSource = '[BOARD]';

export const createBoard = createAction(
  `${actionsSource} CREATE BOARD`,
  props<{ board: IBoard }>(),
);

export const getAllBoards = createAction(
  `${actionsSource} GET ALL BOARDS`,
  props<{ boards: IBoard[] }>()
);

export const getBoardById = createAction(
  `${actionsSource} GET BOARD BY ID`,
  props<{ board: IBoard }>()
);

export const deleteBoard = createAction(
  `${ actionsSource } DELETE BOARD`,
  props<{ board: IBoard }>(),
);

export const updateBoard = createAction(
  `${ actionsSource } CREATE BOARD`,
  props<{ board: IBoard }>(),
);
