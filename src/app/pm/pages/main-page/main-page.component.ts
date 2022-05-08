import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Column } from 'src/app/auth/models/Column.model';
import { selectColumns } from 'src/app/redux/selectors/column.selector';
import * as ColumnAction from '../../../redux/actions/column.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  columns: Column[];

  constructor(private route: ActivatedRoute, private store: Store) {
  }

  ngOnInit(): void {
    const { snapshot: { params: { id } } } = this.route;
    console.log(id);
    this.store.dispatch(ColumnAction.getColumns({ info: { boardID: id } }));
    this.store.select((selectColumns)).subscribe(el => {
      this.columns = el;
    });
  }

}
