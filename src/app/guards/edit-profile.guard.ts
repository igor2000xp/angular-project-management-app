/* eslint-disable ngrx/no-store-subscription */
import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCurrentUser } from '../redux/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})

export class EditProfileClass implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate() {
    return new Observable<boolean>(obs=> {
      this.store.
        select((getCurrentUser))
        .subscribe(el => {
          if (!el) {
            this.router.navigate(['/main']);
            return obs.next(false);
          } else {
            return obs.next(true);
          }
        });
    });
  }
}
