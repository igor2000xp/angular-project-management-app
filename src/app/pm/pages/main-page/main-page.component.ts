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

  constructor(
    private route: ActivatedRoute,
    private store: Store,
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
  }
}
