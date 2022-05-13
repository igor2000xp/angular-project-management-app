import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, pluck } from 'rxjs';
import { ApiService } from 'src/app/auth/services/api.service';
import * as TaskActions from '../actions/task.actions';
import { Task } from 'src/app/auth/models/Task.model';
import { ValidatorsService } from 'src/app/shared/services/validator.service';

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
    private arrDelete: ValidatorsService,
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
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          return this.apiService.createTask(this.currentUser.token, info.boardID, info.columnID, info.task);
        }),
        mergeMap(() => this.apiService.getTasks(this.currentUser.token, this.info.boardID, this.info.columnID)),
        map((tasks) => {
          this.arrDelete.columnArr.next({
            columnId: '',
          });
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
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          return this.apiService.deleteTask(this.currentUser.token, this.info.boardID, this.info.columnID, this.info.taskID);
        },
        ),
        mergeMap(() => this.apiService.getTasks(this.currentUser.token, this.info.boardID, this.info.columnID)),
        map((tasks) => {
          this.arrDelete.columnArr.next({
            columnId: this.info.columnID,
          });
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
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          return this.apiService.updateTask(this.currentUser.token, this.info.boardID, this.info.columnID, this.info.taskID, this.info.task);
        },
        ),
        mergeMap(() => this.apiService.getTasks(this.currentUser.token, this.info.boardID, this.info.columnID)),
        map((tasks) => TaskActions.getTasksActionSuccess({ tasks })),
      );
    },
  );
}
