import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../auth/services/api.service';

import * as UserActions from '../actions/user.actions';
import { catchError, of, switchMapTo } from 'rxjs';

@Injectable()
export class UserEffects {
  token: 'initialString';

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {};

  fetchUsers$ = createEffect(

    () => this.actions$.pipe(
      ofType(UserActions.getUsersAction),
      switchMapTo(
        this.apiService.getUsers(this.token).pipe(
          map((users) => UserActions.getUsersActionSuccess({ users })),
          catchError(() => of(UserActions.getUsersActionFailed()))
        )
      ),
    )
  )
}
