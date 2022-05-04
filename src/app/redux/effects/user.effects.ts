import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../auth/services/api.service';

import * as UserActions from '../actions/user.actions';
import { catchError, map, mergeMap, of, pluck, switchMap } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';

@Injectable()
export class UserEffects {

  currentUser: User;

  userPassword: string;

  userLogin: string;

  userToken : { token: string };

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) { }

  createUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.createUserAction),
        pluck('currentUser'),
        mergeMap((user) => { this.userLogin = user.login; this.userPassword = user.password; return this.apiService.authenticate(user, 'signup'); }),
        mergeMap((user) => {
          this.currentUser = user;
          if (user.id) {
            localStorage.setItem('login', user.login);
            this.apiService.errors$.next('');
          }
          return this.apiService.authenticate({ login: this.userLogin, password: this.userPassword }, 'signin');
        }),
        map((currentUser) => {
          const user: User = Object.assign({}, this.currentUser, currentUser);
          delete user.password;
          return UserActions.createUsersActionSuccess({ currentUser: user });
        }),
      );
    },
  );

  createUsersToken$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.createTokenAction),
        pluck('currentUser'),
        mergeMap((user) => { this.currentUser = user; return this.apiService.authenticate(user, 'signin'); }),
        mergeMap((user) => { this.userToken = user; return this.apiService.getUsers(user.token); }),
        map((currentUser) => {
          if (currentUser.length > 0) {
            localStorage.setItem('login', this.currentUser.login);
            this.apiService.errors$.next('');
          }
          const trueUser = currentUser.filter((el) => el.login === this.currentUser.login);
          console.log(trueUser);
          const user: User = Object.assign({}, trueUser[0], this.currentUser);
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

  deleteUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.deleteUserAction),
        switchMap((currentUser) => { return this.apiService.deleteUser(currentUser.token, currentUser.id); }),
        map(() => {
          const empty = {};
          localStorage.removeItem('login');
          return UserActions.deleteUsersActionSuccess({ empty: empty });
        }),
        catchError(() => of(UserActions.getUsersActionFailed())),
      );
    },
  );

}
