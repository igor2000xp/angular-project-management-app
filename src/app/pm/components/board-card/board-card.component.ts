/* eslint-disable ngrx/no-store-subscription */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { DeleteBoardModalComponent } from '../delete-board-modal/delete-board-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectBoards } from 'src/app/redux/selectors/board.selectors';
import * as BoardAction from '../../../redux/actions/board.actions';
import { Board } from 'src/app/auth/models/Board.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent implements OnInit {

  boards: Board[];

  isEmpty : any;

  constructor(public dialog: MatDialog, private store: Store) {
    this.store.dispatch(BoardAction.getAllBoards());
  }

  ngOnInit(): void {
    this.store.select((selectBoards)).subscribe(el => console.log(el));
    this.store.subscribe(el => console.log(el));
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteBoardModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
