import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/auth/models/Task.model';
import { TaskCardModalComponent } from '../task-card-modal/task-card-modal.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {

  @Input() task: Task;

  title: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.title = this.task.title;
  }

  openTask() {
    const dialogRef = this.dialog.open(TaskCardModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
