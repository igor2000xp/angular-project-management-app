/* eslint-disable ngrx/on-function-explicit-return-type */
import { IBoardsState } from '../state.models';
import { Action, createReducer, on } from '@ngrx/store';
import * as BoardAction from '../actions/board.actions';

export const initialBoardState:IBoardsState = {
  boards: null,
  currentBoard: null,
};

const reducer = createReducer(
  initialBoardState,
  on(BoardAction.createBoardSuccess, (state, { currentBoard }) => {
    return ({
      ...state,
      currentBoard: currentBoard,
    });
  }),

  on(BoardAction.getAllBoardsSuccess, (state, { boards }) => {
    return ({
      ...state,
      boards: boards,
    });
  }),

  // on(BoardAction.getBoardById, (state) => {
  //   return ({
  //     ...state,
  //   });
  // }),

  on(BoardAction.getBoardByIdSuccess, (state) => {
    return ({
      ...state,
    });
  }),

  on(BoardAction.deleteBoardSuccess, (state) => {
    return ({
      ...state,
    });
  }),

  // on(BoardAction.updateBoard, (state) => {
  //   return ({
  //     ...state,
  //   });
  // }),
);

export function boardReducer(state: IBoardsState, action: Action) {
  return reducer(state, action);
}

