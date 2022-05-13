import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Column } from 'src/app/auth/models/Column.model';
import { selectColumns } from 'src/app/redux/selectors/column.selector';

@Injectable({
  providedIn: 'root',
})

export class ValidatorsService {

  columns: Column[];

  columnArr: Subject<{}> = new Subject();

  constructor(private store: Store) {
    this.store.select((selectColumns)).subscribe(el => {
      this.columns = el;
    });
  }

  checkForOrder(control: FormControl) {
    const value = this.columns.filter(el => el.order === +control.value);
    if (value.length !== 0)  return {
      orderError: true,
    };
  }

  checkForLength(control: FormControl) {
    if (control.value.length === 0) { return; }

    if (control.value.length < 8) {
      return {
        lengthError: true,
      };
    }
  }

  checkNameForLength(control: FormControl) {
    if (control.value.length === 0) { return; }

    if (control.value.length < 5) {
      return {
        lengthError: true,
      };
    }
  }

  checkUpperLower(control: FormControl) {
    const rexP: RegExp = /(?=.*[a-z])(?=.*[A-Z])/;
    if (control.value.length === 0) { return; }

    if (!control.value.match(rexP)) {
      return {
        upperLowerError: true,
      };
    }
  }

  checkMixture(control: FormControl) {
    const rexP: RegExp = /[A-Z][a-z]+/;
    const rexP2: RegExp = /[0-9]+/;
    if (control.value.length === 0) { return; }
    if (!control.value.match(rexP) && !control.value.match(rexP2)) {
      return {
        mixtureError: true,
      };
    }
  }

  checkSpecialChar(control: FormControl) {
    const rexP: RegExp = /[!@#$&*%]+/;
    if (control.value.length === 0) { return; }
    if (!control.value.match(rexP)) {
      return {
        specialCharError: true,
      };
    }
  }
}
