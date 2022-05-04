import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCurrentUser } from '../redux/selectors/user.selectors';
// import { getCurrentUser } from '../redux/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})

export class CheckLoginClass implements CanActivate {

  currentUser: any;

  constructor(private store: Store) {

  }

  canActivate():Observable<boolean> {
    return new Observable<boolean>(obs=> {
      this.store.
        select((getCurrentUser))
        .subscribe(el => {
          if (el) {
            return obs.next(true);
          } else {
            return obs.next(false);
          }
        });
    });
  }
}
