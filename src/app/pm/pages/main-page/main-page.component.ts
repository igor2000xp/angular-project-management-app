import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Column } from 'src/app/auth/models/Column.model';
import { selectColumns } from 'src/app/redux/selectors/column.selector';
import * as ColumnAction from '../../../redux/actions/column.actions';
import * as BoardAction from '../../../redux/actions/board.actions';
import { Task } from 'src/app/auth/models/Task.model';
import * as TaskAction from '../../../redux/actions/task.actions';
import { from, map, mergeMap, Observable, switchMap } from 'rxjs';
import { ApiService } from '../../../auth/services/api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  columns: Column[];

  boardId: string;

  allTasks:Task[] = [];

  token:string;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private apiService: ApiService,
  ) {
  }

  getTasksList(column:Array<Column>):void {
    // console.log(column);
    from(column).pipe(
      map((it) => {
        return this.apiService.getTasks(this.token, this.boardId, it.id).subscribe((it) => {
          this.allTasks = this.allTasks.concat(it);
          console.log(this.allTasks);
          // this.store.dispatch(TaskAction.)
        });
      })
    ).subscribe((item) => item.closed);
  }

  ngOnInit(): void {
    const {
      snapshot: {
        params: { id },
      },
    } = this.route;
    this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    // console.log(JSON.parse(localStorage.getItem('currentUser')).token);
    this.boardId = id;
    this.store.dispatch(ColumnAction.getColumns({ info: { boardID: id } }));
    this.store.dispatch(BoardAction.getAllBoards());
    this.store.select(selectColumns).subscribe((el) => {
      this.columns = JSON.parse(JSON.stringify(el))?.sort(
        (a: { order: number }, b: { order: number }) => a.order - b.order,
      );
      // console.log(el);
      if (typeof el !== 'undefined' && el !== null) this.getTasksList(el);
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
