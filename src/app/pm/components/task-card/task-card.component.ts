import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column } from 'src/app/auth/models/Column.model';
import { Task } from 'src/app/auth/models/Task.model';
import { TaskCardModalComponent } from '../task-card-modal/task-update-modal.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {

  @Input() task: Task;

  @Input() column: Column;

  @Input() userID: string;

  @Input() boardID: string;

  title: string;

  description: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.title = this.task.title;
    this.description = this.task.description;
  }

  openTask() {
    const dialogRef = this.dialog.open(TaskCardModalComponent, {
      data: {
        column:  this.column,
        task: this.task,
        userID: this.userID,
        boardID: this.boardID,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
