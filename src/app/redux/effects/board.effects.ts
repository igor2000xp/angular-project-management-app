import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, pluck } from 'rxjs';
import { ApiService } from 'src/app/auth/services/api.service';
import * as BoardAction from '../actions/board.actions';

@Injectable()
export class BoardEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) { }

  createBoard$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BoardAction.createBoard),
        pluck('currentBoard'),
        mergeMap((board) => {
          const currentUser = JSON.parse(localStorage.getItem('currentUser'));
          return this.apiService.createBoard(currentUser.token, board);
        },
        ),
        map((board) => BoardAction.createBoardSuccess({ currentBoard: board })),
      );
    },
  );
}
