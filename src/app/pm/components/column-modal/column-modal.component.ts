import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ColumnAction from '../../../redux/actions/column.actions';

@Component({
  selector: 'app-column-modal',
  templateUrl: './column-modal.component.html',
  styleUrls: ['./column-modal.component.scss'],
})
export class ColumnModalComponent implements OnInit {

  columnForm: FormGroup;

  boardId: string;

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.columnForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
    const { snapshot: { params: { id } } } = this.route;
    this.boardId = id;
    console.log(this.route);
  }

  createColumn() {
    this.store.dispatch(ColumnAction.createColumn({
      column:
        {
          title: this.columnForm.value.title,
          order: 2,
        },
    }));
  }
}
