/* eslint-disable ngrx/prefix-selectors-with-select */
import { createSelector } from '@ngrx/store';
import { IAppState, IUsersState } from '../state.models';

export const getUserStore  = (state: IAppState) => state.users;
export const getCurrentUser = createSelector(
  getUserStore,
  (state:IUsersState) => state.currentUser,
);

// export const getUsers = createSelector(
//   getUserStore,
//   (state:IAppState) => state.users,
// );
