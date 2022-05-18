import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../board-card/board-card.component';
import { ToolsMenuComponent } from '../tools-menu/tools-menu.component';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/auth/models/Task.model';
import  * as TaskSelect from '../../../redux/selectors/task.selectors';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  boardForm: FormGroup;

  returnString: string;

  name: string;

  allTasks: Task[];

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<ToolsMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    // private searchService: SearchService,
  ) { }

  searchHandler() {
    this.returnString = this.data.returnString;
    // const filteredTasks = [...this.allTasks];
  }

  ngOnInit(): void {
    this.boardForm = new FormGroup({
      returnString: new FormControl('', [Validators.required]),
    });
    this.data.returnString = this.data.name;
    this.store.select(TaskSelect.selectTasks).subscribe((tasks) => {
      return this.allTasks = tasks;
    });
  }

  noUpdateClick(): void {
    this.dialogRef.close('Do nothing');
  }
}
