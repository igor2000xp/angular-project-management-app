import { Component, Input, OnInit } from '@angular/core';
import { DeleteBoardModalComponent } from '../delete-board-modal/delete-board-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Column } from 'src/app/auth/models/Column.model';
import { Store } from '@ngrx/store';
import * as ColumnAction from '../../../redux/actions/column.actions';

@Component({
  selector: 'app-column-card',
  templateUrl: './column-card.component.html',
  styleUrls: ['./column-card.component.scss'],
})
export class ColumnCardComponent implements OnInit {

  @Input() column:Column;

  @Input() boardID:string;

  columnTitle: string;

  columnId:string;

  constructor(public dialog: MatDialog, private store:Store) { }

  ngOnInit(): void {
    this.columnTitle = this.column.title;
    this.columnId = this.column.id;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteBoardModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(ColumnAction.deleteColumn({ info: { boardID: this.boardID, columnID: this.columnId } }));
      console.log(result);
    });
  }

}
