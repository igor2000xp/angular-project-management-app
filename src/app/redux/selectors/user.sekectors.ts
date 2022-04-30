import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../state.models';

export const getUserStore  = createFeatureSelector<IAppState>("user");
export const getCurrentUser = createSelector(
  getUserStore,
  (state:IAppState) => state.users.currentUser
);

export const getUsers = createSelector(
  getUserStore,
  (state:IAppState) => state.users
);
