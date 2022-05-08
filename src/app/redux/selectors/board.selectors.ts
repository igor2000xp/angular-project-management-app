import { IBoardsState } from '../state.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// export const selectBoard = (state:IAppState) => state.board;
const selectBoard = createFeatureSelector<IBoardsState>('app-state');

export const selectBoards = createSelector(
  selectBoard,
  (state:IBoardsState) => state.boards,
);
// export const getCustomCards = createSelector(getAppState, (state: AppState) => state.customCards);
