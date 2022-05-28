/* eslint-disable ngrx/on-function-explicit-return-type */
import { IBoardsState } from '../state.models';
import { Action, createReducer, on } from '@ngrx/store';
import * as BoardAction from '../actions/board.actions';

export const initialBoardState:IBoardsState = {
  boards: null,
  currentBoard: null,
};

export const reducer = createReducer(
  initialBoardState,

  on(BoardAction.getAllBoardsSuccess, (state, { boards }) => {
    return ({
      ...state,
      boards: boards,
    });
  }),

  on(BoardAction.getBoardByIdSuccess, (state, { currentBoard }) => {
    return ({
      ...state,
      currentBoard: currentBoard,
    });
  }),

  on(BoardAction.deleteBoardSuccess, (state, { board }) => {
    return ({
      ...state,
      board: board,
    });
  }),

  on(BoardAction.updateBoardSuccess, (state, { board }) => {
    return ({
      ...state,
      board: board,
    });
  }),

  on(BoardAction.setCurrentBoard, (state, { currentBoard }) => {
    return ({
      ...state,
      currentBoard: currentBoard,
    });
  }),
);

export function boardReducer(state: IBoardsState, action: Action) {
  return reducer(state, action);
}

