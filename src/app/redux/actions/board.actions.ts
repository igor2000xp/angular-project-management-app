import { createAction, props } from '@ngrx/store';
import { Board } from 'src/app/auth/models/Board.model';
// import { IBoard } from '../state.models';

const actionsSource = '[BOARD]';

export const createBoard = createAction(
  `${actionsSource} CREATE BOARD`,
  props<{ currentBoard: Board }>(),
);
export const createBoardSuccess = createAction(
  `${actionsSource} CREATE BOARD, SUCCESS`,
  props<{ currentBoard: Board }>(),
);


export const getAllBoards = createAction(
  `${actionsSource} GET ALL BOARDS`,
);

export const getAllBoardsSuccess = createAction(
  `${actionsSource} GET ALL BOARDS SUCCESS`,
  props<{ boards: Board[] }>(),
);

// export const getBoardById = createAction(
//   `${actionsSource} GET BOARD BY ID`,
//   props<{ board: IBoard }>(),
// );

// export const deleteBoard = createAction(
//   `${ actionsSource } DELETE BOARD`,
//   props<{ board: IBoard }>(),
// );

// export const updateBoard = createAction(
//   `${ actionsSource } UPDATE BOARD`,
//   props<{ board: IBoard }>(),
// );
