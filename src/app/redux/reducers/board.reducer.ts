import { IBoard, IBoardsState } from '../state.models';
import { Action, createReducer, on } from '@ngrx/store';
import * as BoardAction from '../actions/board.actions';

export const initialBoardState:IBoardsState = {
  boards: null,
  currentBoard: null,
};

const reducer = createReducer(
  initialBoardState,
  on(BoardAction.createBoardSuccess, (state, { board }) => {
    return ({
      ...state,
      currentBoard: board,
    });
  }),

  on(BoardAction.getAllBoards, (state) => {
    return({
      ...state,
    });
  }),

  on(BoardAction.getBoardById, (state) => {
    return ({
      ...state,
    });
  }),

  on(BoardAction.deleteBoard, (state) => {
    return ({
      ...state,
    });
  }),

  on(BoardAction.updateBoard, (state) => {
    return ({
      ...state,
    });
  }),
);

export function boardReducer(state: IBoardsState, action: Action) {
  return reducer(state, action);
}
