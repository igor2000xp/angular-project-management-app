import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnModalComponent } from '../column-modal/column-modal.component';
import { TaskModalComponent } from '../task-modal/task-create-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface IValidatorMessages {
  searchString: {
    required:string;
    minLength:string;
    maxLength:string;
  };
}


@Component({
  selector: 'app-tools-menu',
  templateUrl: './tools-menu.component.html',
  styleUrls: ['./tools-menu.component.scss'],
})
export class ToolsMenuComponent implements OnInit {

  public adminForm = new FormGroup({
    searchString: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.required,
    ]),
  });

  public validatorMessages:IValidatorMessages = {
    searchString:  {
      required: 'Please enter a search string',
      minLength: 'The search string is too short',
      maxLength: 'The search string is too long',
    },
  };

  constructor(public dialog: MatDialog) {}

  handlerSubmit():void {

  }

  openColumn() {
    const dialogRef = this.dialog.open(ColumnModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openTask() {
    const dialogRef = this.dialog.open(TaskModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
