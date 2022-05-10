import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../board-card/board-card.component';

@Component({
  selector: 'app-board-card-modal-update',
  templateUrl: './board-card-modal-update.component.html',
  styleUrls: ['./board-card-modal-update.component.scss']
})
export class BoardCardModalUpdateComponent implements OnInit {
  boardForm: FormGroup;

  animal: string;

  name: string;

  constructor(
    public dialogRef: MatDialogRef<BoardCardModalUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

  ngOnInit(): void {
    this.boardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  noUpdateClick(): void {
    this.dialogRef.close('Do nothing');
  }

}
