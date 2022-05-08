/* eslint-disable ngrx/no-store-subscription */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { DeleteBoardModalComponent } from '../delete-board-modal/delete-board-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/auth/models/Board.model';
import * as BoardAction from '../../../redux/actions/board.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent implements OnInit {

  @Input() board: Board;

  title: string;

  boardId :string;

  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.title = this.board.title;
    this.boardId = this.board.id;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteBoardModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.store.dispatch(BoardAction.deleteBoard({ id: this.boardId }));
      }
    });
  }

}
