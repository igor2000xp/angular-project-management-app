import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {  Store } from '@ngrx/store';
// import { getCurrentUser } from '../redux/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})

export class CheckLoginClass implements CanActivate {

  currentUser: any;

  constructor(private router: Router, private store: Store) { }

  canActivate() {
    return this.checkLogin();
  }

  checkLogin() {
    if (localStorage.getItem('login')) return true;
    else {
      this.router.navigate(['/main']);
      return false;
    }
  }
}
