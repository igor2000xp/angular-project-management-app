/* eslint-disable ngrx/on-function-explicit-return-type */
import { Action, createReducer, on } from '@ngrx/store';
import { IUsersState } from '../state.models';
import * as UserAction from '../actions/user.actions';

export const initialUserState: IUsersState = {
  users: null,
  currentUser: null,
  isUserFetched: false,
};

const usReducer = createReducer(
  initialUserState,
  on(UserAction.getUsersActionSuccess, (state, { users }) => ({
    ...state,
    users,
    isUserFetched: true,
  })),
  on(UserAction.getUsersActionFailed, (state) => ({
    ...state,
  })),
  on(UserAction.getUserAction, (state) => ({
    ...state,
  })),
  on(UserAction.getUserActionSuccess, (state, { user }) => ({
    ...state,
    user,
    isUserFetched: true,
  })),
  on(UserAction.createUsersActionSuccess, (state, { currentUser }) => ({
    ...state,
    currentUser: currentUser,
    isUserFetched: true,
  })),
  on(UserAction.createTokenActionSuccess, (state, { currentUser }) => (
    {
      ...state,
      currentUser: currentUser,
      isUserFetched: true,
    })),
  on(UserAction.updateUserAction, (state) => ({
    ...state,
  })),
  on(UserAction.updateUsersActionSuccess, (state, { user }) => ({
    ...state,
    user,
    isUserFetched: true,
  })),
  on(UserAction.deleteUserAction, (state) => ({
    ...state,
  })),
  on(UserAction.deleteUsersActionSuccess, (state, { empty }) => ({
    ...state,
    currentUser: empty,
    isUserFetched: true,
  })),
);

export function userReducer(state: IUsersState, action: Action) {
  return usReducer(state, action);
}
