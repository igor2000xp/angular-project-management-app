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
  dragMode?: boolean,
}

@Injectable()
export class TaskEffects {

  info: InfoForTask;

  currentUser: any;

  dragMode: boolean;

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private arrDelete: ValidatorsService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  prevColumnId = '';

  prevTaskId: any;

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
          this.arrDelete.dragNdrop.next(false);
          if (info.dragMode) {
            if (this.prevColumnId === '') {
              this.prevColumnId = this.info.columnID;
              this.prevTaskId = info.taskID;
              return this.apiService.updateTask(this.currentUser.token, this.info.boardID, this.info.columnID, this.info.taskID, this.info.task);
            }
            if (this.prevColumnId !== '' ) {
              if (this.prevTaskId === undefined) {
                this.prevTaskId = this.info.taskID;
                return this.apiService.updateTask(this.currentUser.token, this.info.boardID, this.info.columnID, this.info.taskID, this.info.task);
              }
              if (this.prevTaskId !== info.taskID) {
                this.prevTaskId = this.info.taskID;
                return this.apiService.updateTask(this.currentUser.token, this.info.boardID, this.info.columnID, this.info.taskID, this.info.task);
              }
              return this.apiService.updateTask(this.currentUser.token, this.info.boardID, this.prevColumnId, this.info.taskID, this.info.task);
            }
          } else {
            return this.apiService.updateTask(this.currentUser.token, this.info.boardID, this.info.columnID, this.info.taskID, this.info.task);
          }
        },
        ),
        mergeMap((task) => {
          this.prevColumnId = task.columnId;
          return this.apiService.getTasks(this.currentUser.token, this.info.boardID, this.info.columnID);
        }),
        map((tasks) => TaskActions.getTasksActionSuccess({ tasks })),
      );
    },
  );

  // setTasksFromArray$ = createEffect(
  //   () => {
  //     this.actions$.pipe(
  //       ofType(TaskActions.setTasksFromArray),
  //       pluck('tasks'),
  //       map((tasks) => TaskActions.getTasksActionSuccess({ tasks }))
  //     );
  //   }
  // );
}
