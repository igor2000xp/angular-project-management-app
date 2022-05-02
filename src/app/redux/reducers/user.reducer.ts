import { Action, createReducer, on } from '@ngrx/store';
import { IUser, IUsersState } from '../state.models';
import * as UserAction from '../actions/user.actions';

export const initialUserState: IUsersState = {
  users: null,
  currentUser: null,
  isUserFetched: false,
}

const usReducer = createReducer(
  initialUserState,
  // on(UserAction.getUsersAction, (state) => {
  //   console.log('!!! state', state);
  //   return ({
  //     ...state,
  //   });
  // }),
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
  on(UserAction.getUserActionFailed, (state) => ({
    ...state,
  })),
  on(UserAction.createUsersActionSuccess, (state, { currentUser }) => ({
    ...state,
    currentUser: currentUser,
    isUserFetched: true,
  })),
  on(UserAction.createUsersActionFailed, (state) => ({
    ...state,
  })),
  on(UserAction.createTokenActionSuccess, (state, { currentUser }) => (
    {
    ...state,
    currentUser: {...state.currentUser, currentUser},
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
  on(UserAction.updateUsersActionFailed, (state) => ({
    ...state,
  })),
  on(UserAction.deleteUserAction, (state) => ({
    ...state,
  })),
  on(UserAction.deleteUsersActionSuccess, (state, { user }) => ({
    ...state,
    user,
    isUserFetched: true,
  })),
  on(UserAction.deleteUsersActionFailed, (state) => ({
    ...state,
  })),
);

export function userReducer(state: IUsersState, action: Action) {
  return usReducer(state, action);
}
