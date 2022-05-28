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
  returnString: string;
  name: string;
}

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent implements OnInit {

  @Input() board: Board;

  returnString: string;

  boardId :string;

  name:string;

  infoForBoard:InfoForBoard;

  constructor(public dialog: MatDialog, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.returnString = this.board.title;
    this.boardId = this.board.id;
  }

  openDialogDelete() {
    const dialogRef = this.dialog.open(DeleteBoardModalComponent, {
      data: {
        returnString: this.returnString,
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
      data: { name: this.name, title: this.returnString },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Do nothing' && result) {
        this.returnString = result;
        this.infoForBoard = {
          board:
            {
              id: this.boardId,
              title: this.returnString,
            },
        };
        this.store.dispatch(BoardAction.updateBoard(
          { info: this.infoForBoard },
        ));
      }
    });
  }

  switchToBoard() {
    localStorage.setItem('currentBoardID', this.board.id);
    this.router.navigate(['/board', this.board.id]);
  }
}
