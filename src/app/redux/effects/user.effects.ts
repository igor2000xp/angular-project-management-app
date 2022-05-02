import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../auth/services/api.service';

import * as UserActions from '../actions/user.actions';
import { catchError, map, of, pluck, switchMap, } from 'rxjs';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) { };

  createUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.createUserAction),
      pluck('currentUser'),
      switchMap((user) => { console.log(user); return this.apiService.authenticate(user, 'signup') }),
      map((currentUser) => { return UserActions.createUsersActionSuccess({ currentUser }) }),
      catchError(() => of(UserActions.getUsersActionFailed())),
    ),
  )

  createUsersToken$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.createTokenAction),
      pluck('currentUser'),
      switchMap((user) => { console.log(user); return this.apiService.authenticate(user, 'signin') }),
      map((currentUser) => { return UserActions.createTokenActionSuccess({ currentUser }) }),
      catchError(() => of(UserActions.getUsersActionFailed())),
    ),
  )

  fetchUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.getUsersAction),
      pluck('token'),
      switchMap((token) => { return this.apiService.getUsers(token) }),
      map((users) => { return UserActions.getUsersActionSuccess({ users }) }),
      catchError(() => of(UserActions.getUsersActionFailed()))
    ),
  )


}
