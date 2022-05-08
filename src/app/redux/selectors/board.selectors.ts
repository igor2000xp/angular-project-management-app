import { IAppState, IBoardsState } from '../state.models';
import { createSelector } from '@ngrx/store';

export const selectBoard = (state:IAppState) => state.board;

export const selectBoards = createSelector(
  selectBoard,
  (state:IBoardsState) => state.boards,
);

