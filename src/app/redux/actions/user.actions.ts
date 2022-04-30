import { createAction, props } from '@ngrx/store';
import { IUser } from '../state.models';

const actionSource = '[USER]';

export const getUsersAction = createAction(
  `${actionSource} GET ALL CURRENT USER`,
  props<{token:string}>(),
);
export const getUsersActionSuccess = createAction(
  `${actionSource} GET ALL CURRENT USER, SUCCESS`,
  props<{users:IUser[]}>(),
);
export const getUsersActionFailed = createAction(
  `${actionSource} GET ALL CURRENT USER, FAILED`,
);
export const getUserAction = createAction(
  `${actionSource} GET USER BY ID`,
);
export const getUserActionSuccess = createAction(
  `${actionSource} GET USER BY ID, SUCCESS`,
  props<{user:IUser}>(),
);
export const getUserActionFailed = createAction(
  `${actionSource} GET USER BY ID, FAILED`,
);
export const createUserAction = createAction(
  `${actionSource} CREATE A USER RECORD`,
  props<{user:IUser}>(),
);
export const createUsersActionSuccess = createAction(
  `${actionSource} CREATE A USER RECORD, SUCCESS`,
  props<{user:IUser}>(),
);
export const createUsersActionFailed = createAction(
  `${actionSource} CREATE A USER RECORD, FAILED`,
);
export const updateUserAction = createAction(
  `${actionSource} UPDATE THE USER RECORD`,
);
export const updateUsersActionSuccess = createAction(
  `${actionSource} UPDATE THE USER RECORD, SUCCESS`,
  props<{user:IUser}>(),
);
export const updateUsersActionFailed = createAction(
  `${actionSource} UPDATE THE USER RECORD, FAILED`,
);

export const deleteUserAction = createAction(
  `${actionSource} DELETE THE USER RECORD`,
);
export const deleteUsersActionSuccess = createAction(
  `${actionSource} DELETE THE USER RECORD, SUCCESS`,
  props<{user:IUser}>(),
);
export const deleteUsersActionFailed = createAction(
  `${actionSource} DELETE THE USER RECORD, FAILED`,
);
