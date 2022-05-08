import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Board } from 'src/app/auth/models/Board.model';
import { selectBoards } from 'src/app/redux/selectors/board.selectors';
import * as BoardAction from '../../../redux/actions/board.actions';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {

  boards: Board[];

  boardTitle: string;

  constructor(private store: Store) {this.store.dispatch(BoardAction.getAllBoards());}

  ngOnInit(): void {
    this.store.select((selectBoards)).subscribe(el => {
      console.log(el);
      this.boards = el;
    });
  }

}
