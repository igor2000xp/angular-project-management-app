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

  userToken: { token: string };

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
            this.apiService.errors$.next('');
          }
          return this.apiService.authenticate({ login: this.userLogin, password: this.userPassword }, 'signin');
        }),
        map((currentUser) => {
          this.userToken = currentUser;
          if (this.currentUser.id) {
            const user: User = Object.assign({}, this.currentUser, currentUser, { password: this.userPassword });
            localStorage.setItem('currentUser', JSON.stringify(user));
            return UserActions.createUsersActionSuccess({ currentUser: user });
          } else {
            return UserActions.createUsersActionSuccess({ currentUser: {} });
          }

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
        mergeMap((user) => {
          this.userToken = user;
          return this.apiService.getUsers(user.token);
        }),
        map((currentUser) => {
          if (currentUser.length > 0) {
            this.apiService.errors$.next('');
          } else {
            this.apiService.errors$.next('User was not founded');
          }
          console.log(typeof this.userToken);
          if (typeof this.userToken.token === 'string') {
            const trueUser = currentUser.filter((el) => el.login === this.currentUser.login);
            const user: User = Object.assign({}, trueUser[0], this.currentUser, this.userToken);
            localStorage.setItem('currentUser', JSON.stringify(user));
            return UserActions.createTokenActionSuccess({ currentUser: user });
          } else return UserActions.createTokenActionSuccess({ currentUser:{} });

        }),
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
          localStorage.removeItem('currentUser');
          return UserActions.deleteUsersActionSuccess({ empty: null });
        }),
        catchError(() => of(UserActions.getUsersActionFailed())),
      );
    },
  );

  updateUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.updateUserAction),
        switchMap((obj) => { return this.apiService.updateUser(obj.token, obj.id, obj.user); }),
        map((user) => {
          const currentUser = Object.assign({}, user, this.userToken);
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          return UserActions.createUsersActionSuccess({ currentUser: currentUser });
        }),
      );
    },
  );

}
