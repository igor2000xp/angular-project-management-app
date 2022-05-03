import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class EntryLoginClass implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    return this.checkLogin();
  }

  checkLogin() {
    if (!localStorage.getItem('login')) return true;
    else {
      this.router.navigate(['/main']);
      return false;
    }
  }
}
