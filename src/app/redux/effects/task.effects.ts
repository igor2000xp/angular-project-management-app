import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, pluck } from 'rxjs';
import { ApiService } from 'src/app/auth/services/api.service';
import * as TaskActions from '../actions/task.actions';
import { Task } from 'src/app/auth/models/Task.model';

export interface InfoForTask {
  boardID?: string,
  task?: Task,
  columnID?: string,
  taskID?: string,
}

@Injectable()
export class TaskEffects {

  info: InfoForTask;

  currentUser: any;

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  createTask$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TaskActions.createTaskAction),
        pluck('info'),
        mergeMap((info) => {
          this.info = info;
          return this.apiService.createTask(this.currentUser.token, info.boardID, info.columnID, info.task);
        }),
        mergeMap(() => this.apiService.getTasks(this.currentUser.token, this.info.boardID, this.info.columnID)),
        map((tasks) => {
          console.log(tasks);
          return TaskActions.getTasksActionSuccess({ tasks });
        }),
      );
    },
  );

  getTasks$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TaskActions.getTasksAction),
        mergeMap((info) => {
          return this.apiService.getTasks(this.currentUser.token, info.boardID, info.columnID);
        },
        ),
        map((tasks) => TaskActions.getTasksActionSuccess({ tasks })),
      );
    },
  );

  deleteTask$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TaskActions.deleteTaskAction),
        pluck('info'),
        mergeMap((info) => {
          this.info = info;
          return this.apiService.deleteTask(this.currentUser.token, this.info.boardID, this.info.columnID, this.info.taskID);
        },
        ),
        mergeMap(() => this.apiService.getTasks(this.currentUser.token, this.info.boardID, this.info.columnID)),
        map((tasks) => {
          console.log(tasks);
          if (tasks.length === 0) return TaskActions.getTasksActionSuccess({ tasks: [] });
          return TaskActions.getTasksActionSuccess({ tasks });
        }),
      );
    },
  );

  getTaskById$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TaskActions.getTasksByIdAction),
        pluck('info'),
        mergeMap((info) => {
          this.info = info;
          return this.apiService.getTaskById(this.currentUser.token, this.info.boardID, this.info.columnID, this.info.taskID);
        },
        ),
        map((task) => TaskActions.getTasksByIdActionSuccess({ task })),
      );
    },
  );

  updateTask$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TaskActions.updateTaskAction),
        pluck('info'),
        mergeMap((info) => {
          this.info = info;
          return this.apiService.updateTask(this.currentUser.token, this.info.boardID, this.info.columnID, this.info.taskID, this.info.task);
        },
        ),
        mergeMap(() => this.apiService.getTasks(this.currentUser.token, this.info.boardID, this.info.columnID)),
        map((tasks) => TaskActions.getTasksActionSuccess({ tasks })),
      );
    },
  );
}
