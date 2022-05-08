import { Component, OnInit } from '@angular/core';
import { DeleteBoardModalComponent } from '../delete-board-modal/delete-board-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-column-card',
  templateUrl: './column-card.component.html',
  styleUrls: ['./column-card.component.scss'],
})
export class ColumnCardComponent implements OnInit {

  public name: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteBoardModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
