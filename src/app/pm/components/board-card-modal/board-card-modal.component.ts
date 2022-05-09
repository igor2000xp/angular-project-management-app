/* eslint-disable ngrx/avoid-dispatching-multiple-actions-sequentially */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as BoardAction from '../../../redux/actions/board.actions';

@Component({
  selector: 'app-board-card-modal',
  templateUrl: './board-card-modal.component.html',
  styleUrls: ['./board-card-modal.component.scss'],
})
export class BoardCardModalComponent implements OnInit {

  boardForm: FormGroup;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.boardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  createBoard() {
    this.store.dispatch(BoardAction.createBoard({ info: { board:
    {
      title: this.boardForm.value.title,
    } } }));
  }

}
