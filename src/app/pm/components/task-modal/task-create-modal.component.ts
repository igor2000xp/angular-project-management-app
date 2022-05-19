import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as TaskAction from '../../../redux/actions/task.actions';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-create-modal.component.html',
  styleUrls: ['./task-create-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {

  createTaskForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.createTaskForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [Validators.required]),
    });
  }

  createTask() {
    this.store.dispatch(TaskAction.createTaskAction({
      info: {
        boardID: this.data.boardId,
        columnID: this.data.columnId,
        task: {
          title: this.createTaskForm.value.title,
          order: this.data.order,
          description: this.createTaskForm.value.description,
          userId: this.data.userId,
          done: false,
        },
      },
    }));
  }
}
