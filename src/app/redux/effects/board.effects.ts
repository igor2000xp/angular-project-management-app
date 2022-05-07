import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import * as BoardAction from '../actions/board.actions';
import { ApiService } from '../../auth/services/api.service';
import { IBoard } from '../state.models';



@Injectable()
export class BoardEffects {
  private token: string;

  constructor(
    private actions$: Actions,
    private readonly apiService: ApiService,
  ) {}

  // createAllBoard: Observable<Action> = createEffect(() => (
  //   this.actions$.pipe(
  //     ofType(BoardAction.createBoard),
  //     switchMapTo(
  //       // this.token = localStorage.getItem('token');
  //       this.apiService.getBoards(this.token).pipe(
  //         map( user => user)
  //       )
  //     )
  //
  //   )
  // ))
}
