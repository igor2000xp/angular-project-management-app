import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as TaskAction from '../../../redux/actions/task.actions';

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
    private store: Store) {}

  ngOnInit(): void {
    this.title = this.data.task.title;
    this.description = this.data.task.description;
    this.updateTaskForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [Validators.required]),
    });
    this.updateTaskForm.controls.description.setValue(this.description);
  }

  deleteTask() {
    if (this.data) {
      this.store.dispatch(TaskAction.deleteTaskAction({
        info: {
          boardID: this.data.boardID,
          columnID: this.data.column.id,
          taskID: this.data.task.id,
        },
      },
      ),
      );
    }
  }
}
// update() {
//   task: {
//     title: this.data.task.title,
//     order: this.data.column.order,
//     description: this.data.task.description,
//     userId: this.data.userID,
//   },
// },


