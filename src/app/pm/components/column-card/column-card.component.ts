import { Component, Input, OnInit } from '@angular/core';
import { DeleteBoardModalComponent } from '../delete-board-modal/delete-board-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Column } from 'src/app/auth/models/Column.model';

@Component({
  selector: 'app-column-card',
  templateUrl: './column-card.component.html',
  styleUrls: ['./column-card.component.scss'],
})
export class ColumnCardComponent implements OnInit {

  @Input() column:Column;

  columnTitle: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.columnTitle = this.column.title;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteBoardModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
