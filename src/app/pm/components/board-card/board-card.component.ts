/* eslint-disable ngrx/no-store-subscription */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { DeleteBoardModalComponent } from '../delete-board-modal/delete-board-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/auth/models/Board.model';
import * as BoardAction from '../../../redux/actions/board.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { BoardCardModalUpdateComponent } from '../board-card-modal-update/board-card-modal-update.component';
import { InfoForBoard } from '../../../redux/effects/board.effects';

export interface DialogData {
  title: string;
  name: string;
}

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent implements OnInit {

  @Input() board: Board;

  title: string;

  boardId :string;

  name:string;

  infoForBoard:InfoForBoard;

  constructor(public dialog: MatDialog, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.title = this.board.title;
    this.boardId = this.board.id;
  }

  openDialogDelete() {
    console.log(this.title);
    const dialogRef = this.dialog.open(DeleteBoardModalComponent, {
      data: {
        title: this.title,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(BoardAction.deleteBoard({ id: this.boardId }));
      }
    });
  }

  openDialogUpdate() {

    const dialogRef = this.dialog.open(BoardCardModalUpdateComponent, {
      width: '250px',
      data: { name: this.name, title: this.title },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Do nothing' && result) {
        this.title = result;
        this.infoForBoard = {
          board:
            {
              id: this.boardId,
              title: this.title,
            },
        };
        this.store.dispatch(BoardAction.updateBoard(
          { info: this.infoForBoard },
        ));
      }
    });
  }

  switchToBoard() {
    this.router.navigate(['/board', this.board.id]);
  }
}
