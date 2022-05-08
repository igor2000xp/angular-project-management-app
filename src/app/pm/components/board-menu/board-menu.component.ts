/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardCardModalComponent } from '../board-card-modal/board-card-modal.component';



@Component({
  selector: 'app-board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.scss'],
})
export class BoardMenuComponent implements OnInit {

  ediMode: string;

  @Output() fetchMode = new EventEmitter<{ value: string }>();

  constructor(public dialog: MatDialog) { }

  editMode = 'false';

  ngOnInit(): void {
  }

  openColumn() {
    const dialogRef = this.dialog.open(BoardCardModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editFetch(value: string) {
    this.fetchMode.emit({ value: value });
  }

  switchEditMode() {
    this.editMode === 'false' ?  this.editMode = 'true' : this.editMode = 'false';
    console.log(this.ediMode);
  }

}
