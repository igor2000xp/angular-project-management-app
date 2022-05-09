import { Component, Input, OnInit } from '@angular/core';
import { DeleteBoardModalComponent } from '../delete-board-modal/delete-board-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Column } from 'src/app/auth/models/Column.model';
import { Store } from '@ngrx/store';
import * as ColumnAction from '../../../redux/actions/column.actions';
import * as TaskAction from '../../../redux/actions/task.actions';
import { selectTasks } from 'src/app/redux/selectors/task.selectors';
import { Task } from 'src/app/auth/models/Task.model';

@Component({
  selector: 'app-column-card',
  templateUrl: './column-card.component.html',
  styleUrls: ['./column-card.component.scss'],
})
export class ColumnCardComponent implements OnInit {

  @Input() column:Column;

  @Input() boardID:string;

  columnTitle: string;

  columnId:string;

  tasks: Task[];

  currentUser: any;

  constructor(public dialog: MatDialog, private store:Store) { }

  ngOnInit(): void {
    this.columnTitle = this.column.title;
    this.columnId = this.column.id;
    this.store.dispatch(TaskAction.getTasksAction({
      boardID: this.boardID,
      columnID: this.columnId,
    }));
    this.store.select((selectTasks)).subscribe(el => {
      if (el) {
        const arr = el.filter(task=> task.columnId == this.columnId);
        if (arr.length > 0) {
          this.tasks = [...el];
        }
      }
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteBoardModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(ColumnAction.deleteColumn({ info: { boardID: this.boardID, columnID: this.columnId } }));
      console.log(result);
    });
  }

  createTask() {
    this.store.dispatch(TaskAction.createTaskAction({ info: {
      boardID: this.boardID,
      columnID: this.columnId,
      task: {
        title: 'aaa',
        order:2,
        description: 'aaaa123',
        userId: this.currentUser.id,
      } } }));
    console.log(this.columnId);
  }

  deleteTask() {
    this.store.dispatch(TaskAction.deleteTaskAction({ info: {
      boardID: this.boardID,
      columnID: this.columnId,
      task: {
        title: 'aaa',
        order:2,
        description: 'aaaa123',
        userId: this.currentUser.id,
      } } }));
  }

}
