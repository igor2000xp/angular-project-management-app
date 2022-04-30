import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../auth/services/api.service';

import * as UserActions from '../actions/user.actions';
import { catchError, map, of, pluck, switchMap, switchMapTo,  } from 'rxjs';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {};

  fetchUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.getUsersAction),
      pluck('token'),
      switchMap((token) => { return this.apiService.getUsers(token)}),
      map((users) => {console.log(users); return UserActions.getUsersActionSuccess({ users })}),
      catchError(() => of(UserActions.getUsersActionFailed()))
      ),
    )
}
