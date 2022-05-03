import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../auth/services/api.service';

import * as UserActions from '../actions/user.actions';
import { catchError, map, mergeMap, of, pluck, switchMap } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';

@Injectable()
export class UserEffects {

  currentUser: User;

  userError: string | boolean;

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) { }

  createUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.createUserAction),
        pluck('currentUser'),
        mergeMap((user) => { this.currentUser = user; return this.apiService.authenticate(user, 'signup'); }),
        mergeMap((user) => {
          if (user.id) this.apiService.errors$.next('');
          return this.apiService.authenticate({ login: this.currentUser.login, password: this.currentUser.password }, 'signin');
        }),
        map((currentUser) => {
          const user: User = Object.assign({}, this.currentUser, currentUser);
          delete user.password;
          return UserActions.createUsersActionSuccess({ currentUser: user });
        }),
        catchError(() => of(UserActions.getUsersActionFailed())),
      );
    },
  );

  createUsersToken$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.createTokenAction),
        pluck('currentUser'),
        switchMap((user) => { this.currentUser = user; return this.apiService.authenticate(user, 'signin'); }),
        map((currentUser) => {
          const user: User = Object.assign({}, this.currentUser, currentUser);
          delete user.password;
          return UserActions.createTokenActionSuccess({ currentUser: user });
        }),
        catchError(() => of(UserActions.getUsersActionFailed())),
      );
    },
  );

  fetchUsers$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.getUsersAction),
        pluck('token'),
        switchMap((token) => { return this.apiService.getUsers(token); }),
        map((users) => { return UserActions.getUsersActionSuccess({ users }); }),
        catchError(() => of(UserActions.getUsersActionFailed())),
      );
    },
  );


}
