/* eslint-disable ngrx/no-store-subscription */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../auth/models/user.model';

@Injectable({
  providedIn: 'root',
})

export class UserLogOutClass implements CanActivate {

  currentUser: User;

  constructor(private router: Router) {

  }

  canActivate() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.currentUser) return true;
    else {
      this.router.navigate(['/board']);return false;
    }
  }
}
