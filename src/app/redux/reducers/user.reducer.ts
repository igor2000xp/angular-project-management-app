import { Action, createReducer, on } from '@ngrx/store';
import { IUser } from '../state.models';
import * as UserAction from '../actions/user.actions';

export interface IUserState {
  user: IUser | null;
  isUserFetched: boolean;
}

export const initialUserState:IUserState = {
  user: null,
  isUserFetched: false,
}

const usReducer = createReducer(
  initialUserState,
  on(UserAction.getUsersAction, (state) => {
    console.log('!!! state', state);
    return ({
      ...state,
    });
  }),

  on(UserAction.getUsersActionSuccess, (state, { user }) => ({
    ...state,
    user,
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
  on(UserAction.createUserAction, (state) => ({
    ...state,
  })),
  on(UserAction.createUsersActionSuccess, (state, { user }) => ({
    ...state,
    user,
    isUserFetched: true,
  })),
  on(UserAction.createUsersActionFailed, (state) => ({
    ...state,
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

export function userReducer(state: IUserState, action: Action) {
  return usReducer(state, action);
}
