import { IBoardsState } from '../state.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectBoard = createFeatureSelector<IBoardsState>('boards');

export const selectBoards = createSelector(
  selectBoard,
  (state:IBoardsState) => state.boards,
);
