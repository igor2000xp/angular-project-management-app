import { IBoardsState } from '../state.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectBoard = createFeatureSelector<IBoardsState>('board-state');

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
