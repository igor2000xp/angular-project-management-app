import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as TaskAction from '../../../redux/actions/task.actions';
import { DeleteBoardModalComponent } from '../delete-board-modal/delete-board-modal.component';

@Component({
  selector: 'app-task-card-modal',
  templateUrl: './task-update-modal.component.html',
  styleUrls: ['./task-update-modal.component.scss'],
})
export class TaskCardModalComponent implements OnInit {

  updateTaskForm: FormGroup;

  title: string;

  description: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.title = this.data.task.title;
    this.description = this.data.task.description;
    this.updateTaskForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [Validators.required]),
    });
    this.updateTaskForm.controls.title.setValue(this.title);
    this.updateTaskForm.controls.description.setValue(this.description);
  }

  deleteTask() {
    const dialogRef = this.dialog.open(DeleteBoardModalComponent, {
      data: {
        title: this.title,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.store.dispatch(TaskAction.deleteTaskAction({
        info: {
          boardID: this.data.boardID,
          columnID: this.data.column.id,
          taskID: this.data.task.id,
        },
      },
      ),
      );
    });

  }

  updateTask() {
    this.store.dispatch(TaskAction.updateTaskAction({
      info: {
        boardID: this.data.boardID,
        columnID: this.data.column.id,
        taskID: this.data.task.id,
        task: {
          title: this.updateTaskForm.value.title,
          order: this.data.column.order,
          description: this.updateTaskForm.value.description,
          userId: this.data.userID,
          boardId: this.data.boardID,
          columnId: this.data.column.id,
          done: false,
        },
      },
    },
    ),
    );
  }
}


