/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { ColumnModalComponent } from '../column-modal/column-modal.component';
import { TaskModalComponent } from '../task-modal/task-create-modal.component';

export interface IValidatorMessages {
  searchString: {
    required: string;
    minLength: string;
    maxLength: string;
  };
}
//
// export interface DialogData {
//   returnString: string;
// }

@Component({
  selector: 'app-tools-menu',
  templateUrl: './tools-menu.component.html',
  styleUrls: ['./tools-menu.component.scss'],
})
export class ToolsMenuComponent implements OnInit {
  returnString: string;

  searchTitle: string;

  toggleSearchingBlock:boolean = false;

  indeterminate = false;

  labelPosition: 'title' | 'id' | 'description' = 'title';

  disabled = false;

  constructor(public dialog: MatDialog, private router: Router, private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.searchMode.subscribe(el => {
      this.searchTitle = el;
    });
    if (this.searchTitle === undefined) this.searchTitle = 'title';
  }

  public adminForm = new FormGroup({
    searchString: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.required,
    ]),
  });

  // public validatorMessages: IValidatorMessages = {
  //   searchString: {
  //     required: 'Please enter a search string',
  //     minLength: 'The search string is too short',
  //     maxLength: 'The search string is too long',
  //   },
  // };

  searchValue(value: any) {
    this.searchService.searchValue.next(value);
  }

  openOptions() {
    this.toggleSearchingBlock = true;
  }
  closeOptions() {
    this.toggleSearchingBlock = false;
  }

  searchOption(option: string) {
    this.searchService.searchMode.next(option);
  }

  openColumn() {
    const dialogRef = this.dialog.open(ColumnModalComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openTask() {
    const dialogRef = this.dialog.open(TaskModalComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  switchPage() {
    this.router.navigateByUrl('board');
  }
}
