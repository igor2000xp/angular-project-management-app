/* eslint-disable ngrx/no-store-subscription */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, Input, OnInit } from '@angular/core';
import { DeleteBoardModalComponent } from '../delete-board-modal/delete-board-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Column } from 'src/app/auth/models/Column.model';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as ColumnAction from '../../../redux/actions/column.actions';
import * as TaskAction from '../../../redux/actions/task.actions';
import { selectTasks } from 'src/app/redux/selectors/task.selectors';
import { Task } from 'src/app/auth/models/Task.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskModalComponent } from '../task-modal/task-create-modal.component';
import { ValidatorsService } from 'src/app/shared/services/validator.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-column-card',
  templateUrl: './column-card.component.html',
  styleUrls: ['./column-card.component.scss'],
})
export class ColumnCardComponent implements OnInit {
  @Input() column: Column;

  @Input() boardID: string;

  columnTitle: string;

  columnId: string;

  userId: string;

  tasks: Task[] = [];

  currentUser: any;

  columnForm: FormGroup;

  searchMode: string;

  searchValue: string;

  constructor(public dialog: MatDialog, private store: Store, private deleteArr: ValidatorsService, private searchService: SearchService ) { }

  editMode = true;

  deletedArr: any;

  ngOnInit(): void {
    this.searchService.searchValue.subscribe(el => this.searchValue = el);
    this.columnTitle = this.column.title;
    this.columnId = this.column.id;
    this.store.dispatch(TaskAction.getTasksAction({
      boardID: this.boardID,
      columnID: this.columnId,
    }));
    this.deleteArr.columnArr.subscribe((el) => this.deletedArr = el);
    this.store.select((selectTasks)).subscribe(el => {
      if (el) {
        const arr = el.filter((task) => task.columnId === this.columnId);
        if (arr.length > 0) {
          this.tasks = [...arr].sort((a, b) => {
            return a.order - b.order;
          });
        }
        if (this.deletedArr) (arr.length === 0 && this.deletedArr.columnId === this.columnId) ? this.tasks = [...arr] : null;
      }
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userId = this.currentUser.id;
    this.columnForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteBoardModalComponent, {
      data: {
        title: this.column.title,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.store.dispatch(
          ColumnAction.deleteColumn({
            info: { boardID: this.boardID, columnID: this.columnId },
          }),
        );
    });
  }

  switchMode() {
    this.editMode === true ? (this.editMode = false) : (this.editMode = true);
  }

  updateColumn() {
    this.store.dispatch(
      ColumnAction.updateColumn({
        info: {
          boardID: this.boardID,
          columnID: this.columnId,
          column: {
            title: this.columnForm.value.title,
            order: this.column.order,
          },
        },
      }),
    );
  }

  openCreateTaskModal() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: {
        columnId: this.columnId,
        boardId: this.boardID,
        order: this.column.order,
        userId: this.userId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  dropToo(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.tasks.forEach((el, index) => {
        this.store.dispatch(
          TaskAction.updateTaskAction({
            info: {
              boardID: el.boardId,
              columnID: el.columnId,
              taskID: el.id,
              task: {
                title: el.title,
                order: index,
                description: el.description,
                userId: this.userId,
                boardId: el.boardId,
                columnId: el.columnId,
                done: false,
              },
            },
          }),
        );
      });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data || [],
        event.previousIndex,
        event.currentIndex,
      );
      this.tasks.forEach((el, index) => {
        this.store.dispatch(
          TaskAction.updateTaskAction({
            info: {
              boardID: el.boardId,
              columnID: el.columnId,
              taskID: el.id,
              task: {
                title: el.title,
                order: index,
                description: el.description,
                userId: this.userId,
                boardId: this.boardID,
                columnId: this.columnId,
                done: false,
              },
            },
          }),
        );
      });
    }
  }
}

