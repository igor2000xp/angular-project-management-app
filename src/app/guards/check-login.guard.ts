/* eslint-disable ngrx/no-store-subscription */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCurrentUser } from '../redux/selectors/user.selectors';
// import { getCurrentUser } from '../redux/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})

export class CheckLoginClass implements CanActivate {

  currentUser: any;

  constructor(private router: Router, private store: Store) {

  }

  canActivate():Observable<boolean> {
    return new Observable<boolean>(obs=> {
      this.store.
        select((getCurrentUser))
        .subscribe(el => {
          console.log(el);
          if (el && el !== null) {
            return obs.next(true);
          } else {
            this.router.navigate(['/main']);
            return obs.next(false);
          }
        });
    });
  }
}
