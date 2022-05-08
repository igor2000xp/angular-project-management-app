import { IAppState, IBoardsState } from '../state.models';
import { createSelector } from '@ngrx/store';

// export const selectBoard = createFeatureSelector<IBoardsState>('board-state');

export const selectBoard = (state:IAppState) => state.board;

export const selectCreateBoard = createSelector(selectBoard, (state:IBoardsState) => {
  return state.boards;
});

export const selectAllBoards = createSelector(selectBoard, (state:IBoardsState) => {
  return state.boards;
});

export const selectBoardById = createSelector(selectBoard, (state:IBoardsState) => {
  return state.boards;
});

export const selectCurrentBoard = createSelector(selectBoard, (state:IBoardsState) => {
  return state.currentBoard;
});

export const selectDeleteBoard = createSelector(selectBoard, (state:IBoardsState) => {
  return state.boards;
});

export const selectUpdateBoard = createSelector(selectBoard, (state:IBoardsState) => {
  return state.boards;
});