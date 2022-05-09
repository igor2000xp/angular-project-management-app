import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ValidatorsService } from 'src/app/shared/services/validator.service';
import * as ColumnAction from '../../../redux/actions/column.actions';

@Component({
  selector: 'app-column-modal',
  templateUrl: './column-modal.component.html',
  styleUrls: ['./column-modal.component.scss'],
})
export class ColumnModalComponent implements OnInit {

  columnForm: FormGroup;

  boardId: string;

  constructor(private store: Store, private route: ActivatedRoute, private validators: ValidatorsService) { }

  ngOnInit(): void {
    this.columnForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      order: new FormControl('', [
        Validators.required,
        this.validators.checkForOrder.bind(this.validators)]),
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
        order: +this.columnForm.value.order,
      },
    }));
  }

  cancel() {
    console.log(this.columnForm);
    console.log(this.columnForm.get('order').errors?.orderError);
  }
}
