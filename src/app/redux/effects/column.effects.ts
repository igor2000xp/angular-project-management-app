import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, pluck } from 'rxjs';
import { Column } from 'src/app/auth/models/Column.model';
import { ApiService } from 'src/app/auth/services/api.service';
import * as ColumnAction from '../actions/column.actions';

export interface InfoForColumn {
  boardID?: string,
  column?: Column,
  columnID?: string,
}

@Injectable()
export class ColumnEffects {

  info: InfoForColumn;

  currentUser: any;

  actualBoardID: string;

  constructor(private actions$: Actions, private apiService: ApiService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  createColumn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ColumnAction.createColumn),
        pluck('column'),
        mergeMap((column) => {
          return this.apiService.createColumn(this.currentUser.token, this.actualBoardID, column);
        }),
        mergeMap(() => this.apiService.getColumns(this.currentUser.token, this.actualBoardID)),
        map((columns) => ColumnAction.getColumnsSuccess({ columns })),
      );
    },
  );

  getColumns$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ColumnAction.getColumns),
        pluck('info'),
        mergeMap((info) => {
          this.info = info;
          this.actualBoardID = info.boardID;
          return this.apiService.getColumns(this.currentUser.token, info.boardID);
        }),
        map((columns) => ColumnAction.getColumnsSuccess({ columns })),
      );
    },
  );

  deleteColumn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ColumnAction.deleteColumn),
        pluck('info'),
        mergeMap((info) => {
          this.info = info;
          return this.apiService.deleteColumn(this.currentUser.token, info.boardID, info.columnID);
        }),
        mergeMap(() => {
          return this.apiService.getColumns(this.currentUser.token,  this.info.boardID);
        }),
        map((columns) => ColumnAction.getColumnsSuccess({ columns })),
      );
    },
  );

  getColumnById$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ColumnAction.getColumnById),
        pluck('info'),
        mergeMap((info) => {
          this.info = info;
          return this.apiService.getColumnById(this.currentUser.token, info.boardID, info.columnID);
        }),
        map((column) => ColumnAction.getColumnByIdSuccess({ column })),
      );
    },
  );

  updateColumn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ColumnAction.updateColumn),
        pluck('info'),
        mergeMap((info) => {
          this.info = info;
          return this.apiService.updateColumn(this.currentUser.token, info.boardID, info.columnID, info.column);
        }),
        mergeMap(() => {
          return this.apiService.getColumns(this.currentUser.token,  this.info.boardID);
        }),
        map((columns) => ColumnAction.getColumnsSuccess({ columns })),
      );
    },
  );
}
