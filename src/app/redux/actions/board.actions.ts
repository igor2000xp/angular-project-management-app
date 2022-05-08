import { createAction, props } from '@ngrx/store';
import { Board } from 'src/app/auth/models/Board.model';
import { InfoForBoard } from '../effects/board.effects';

const actionsSource = '[BOARD]';

export const createBoard = createAction(
  `${actionsSource} CREATE BOARD`,
  props<{ info: InfoForBoard }>(),
);
// export const createBoardSuccess = createAction(
//   `${actionsSource} CREATE BOARD, SUCCESS`,
//   props<{ board: Board }>(),
// );

export const getAllBoards = createAction(
  `${actionsSource} GET ALL BOARDS`,
);

export const getAllBoardsSuccess = createAction(
  `${actionsSource} GET ALL BOARDS SUCCESS`,
  props<{ boards: Board[] }>(),
);


export const getBoardById = createAction(
  `${actionsSource} GET BOARD BY ID`,
  props<{ info: InfoForBoard }>(),
);

export const getBoardByIdSuccess = createAction(
  `${actionsSource} GET BOARD BY ID,  SUCCESSFUL`,
  props<{ currentBoard: Board }>(),
);

export const deleteBoard = createAction(
  `${ actionsSource } DELETE BOARD`,
  props<{ info: InfoForBoard }>(),
);

export const deleteBoardSuccess = createAction(
  `${ actionsSource } DELETE BOARD, SUCCESS`,
  props<{ board: Board }>(),
);


export const updateBoard = createAction(
  `${ actionsSource } UPDATE BOARD`,
  props<{ info: InfoForBoard }>(),
);
export const updateBoardSuccess = createAction(
  `${ actionsSource } UPDATE BOARD, SUCCESS`,
  props<{ board: Board }>(),
);
