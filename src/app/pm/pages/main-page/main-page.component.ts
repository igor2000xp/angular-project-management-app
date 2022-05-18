/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Column } from 'src/app/auth/models/Column.model';
import { selectColumns } from 'src/app/redux/selectors/column.selector';
import * as ColumnAction from '../../../redux/actions/column.actions';
import * as BoardAction from '../../../redux/actions/board.actions';
import { Task } from 'src/app/auth/models/Task.model';
import { ApiService } from 'src/app/auth/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  columns: Column[];

  boardId: string;

  allTasks: Task[] = [];

  token: string;

  error: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public auth: ApiService,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    const {
      snapshot: {
        params: { id },
      },
    } = this.route;
    this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    this.boardId = id;
    this.store.dispatch(ColumnAction.getColumns({ info: { boardID: id } }));
    this.store.dispatch(BoardAction.getAllBoards());
    this.store.select(selectColumns).subscribe((el) => {
      this.columns = JSON.parse(JSON.stringify(el))?.sort(
        (a: { order: number }, b: { order: number }) => a.order - b.order,
      );
    });
    this.auth.errors$.subscribe((error) => {
      this.error = error;
      if (this.error === 'Task was not founded!') {
        this._snackBar.open('Перетаскивай таск помедленнее! Если видишь это сообщение повторно - обнови страницу', 'OK', {
          duration: 3000,
        });
      }
    });

  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    const {
      snapshot: {
        params: { id },
      },
    } = this.route;
    this.boardId = id;
    this.columns.forEach((el) => {
      return this.store.dispatch(
        ColumnAction.updateColumn({
          info: {
            boardID: id,
            column: { title: el.title, order: el.order + 100 },
            columnID: el.id,
          },
        }),
      );
    });
    setTimeout(() => {
      this.columns.forEach((el, index) => {
        return this.store.dispatch(
          ColumnAction.updateColumn({
            info: {
              boardID: id,
              column: { title: el.title, order: index },
              columnID: el.id,
            },
          }),
        );
      });
    }, 100);

  }
}
