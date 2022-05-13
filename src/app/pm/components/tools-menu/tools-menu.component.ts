import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColumnModalComponent } from '../column-modal/column-modal.component';
import { TaskModalComponent } from '../task-modal/task-create-modal.component';

@Component({
  selector: 'app-tools-menu',
  templateUrl: './tools-menu.component.html',
  styleUrls: ['./tools-menu.component.scss'],
})
export class ToolsMenuComponent implements OnInit {


  constructor(public dialog: MatDialog, private router: Router) {}

  openColumn() {
    const dialogRef = this.dialog.open(ColumnModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openTask() {
    const dialogRef = this.dialog.open(TaskModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  switchPage() {
    this.router.navigateByUrl('board');
  }

  ngOnInit(): void {
  }

}
