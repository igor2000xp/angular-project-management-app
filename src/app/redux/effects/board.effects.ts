import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { ApiService } from 'src/app/auth/services/api.service';
import * as BoardAction from '../actions/board.actions';
import { Board } from '../../auth/models/Board.model';

export interface InfoForBoard {
  boardID?: string,
  board?: Board,
  columnID?: string,
  taskID?: string,
}

@Injectable()
export class BoardEffects {
  info: InfoForBoard;

  currentUser: any;

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  createBoard$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BoardAction.createBoard),
        map((v) => v.info),
        mergeMap((info) => {
          this.info = info;
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          return this.apiService.createBoard(this.currentUser.token, this.info.board);
        },
        ),
        mergeMap(() => {
          return this.apiService.getBoards(this.currentUser.token);
        }),
        map((boards) => BoardAction.getAllBoardsSuccess({ boards })),
      );
    },
  );

  getAllBoards$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BoardAction.getAllBoards),
        mergeMap(() =>  {
          const currentUser = JSON.parse(localStorage.getItem('currentUser'));
          return this.apiService.getBoards(currentUser.token);
        },
        ),
        map((boards) => {
          return BoardAction.getAllBoardsSuccess({ boards });
        }),
      );
    },
  );

  getBoardById$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BoardAction.getBoardById),
        map(v => v.info),
        mergeMap((info) => {
          const currentUser = JSON.parse(localStorage.getItem('currentUser'));
          return this.apiService.getBoardById(currentUser.token, info.boardID);
        }),
        map((currentBoard) => {
          return BoardAction.getBoardByIdSuccess({ currentBoard });
        }),
      );
    },
  );

  deleteBoard$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BoardAction.deleteBoard),
        mergeMap((board) => {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          return this.apiService.deleteBoard(this.currentUser.token, board.id);
        }),
        mergeMap(() => this.apiService.getBoards(this.currentUser.token)),
        map((boards) => {
          return BoardAction.getAllBoardsSuccess({ boards });
        }),
      );
    },
  );

  updateBoard$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BoardAction.updateBoard),
        map((v) => v.info),
        mergeMap((info) => {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          return this.apiService.updateBoard(
            this.currentUser.token,
            info.board.id,
            { title: info.board.title },
          );
        }),
        mergeMap(() => this.apiService.getBoards(this.currentUser.token)),
        map((boards) => BoardAction.getAllBoardsSuccess({ boards }),
        ));
    },
  );
}
