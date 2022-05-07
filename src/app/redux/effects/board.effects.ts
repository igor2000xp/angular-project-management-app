import { Injectable, OnInit } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, Observable, pluck, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import * as BoardAction from '../actions/board.actions';
import { ApiService } from '../../auth/services/api.service';
import { IBoard } from '../state.models';



@Injectable()
export class BoardEffects implements OnInit {
  private token: string;

  constructor(
    private actions$: Actions,
    private readonly apiService: ApiService,
  ) {}

  createAllBoard = createEffect(() => this.actions$.pipe(
    ofType(BoardAction.createBoard),
    // pluck('board'),
    mergeMap((board) => this.apiService.createBoard(this.token, board.board).pipe(
      // map((board) => board)
    // ))
    )
  )

  ngOnInit() {
    this.token = localStorage.getItem('token');
  }
}
