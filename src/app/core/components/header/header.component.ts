/* eslint-disable ngrx/no-store-subscription */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';
import { ApiService } from 'src/app/auth/services/api.service';
import { getCurrentUser } from 'src/app/redux/selectors/user.selectors';
import { NavigationService } from 'src/app/shared/services/navigationService';
import * as UserAction from '../../../redux/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  userLogin: string;

  error: string;

  currentUser: User;

  constructor(private router: Router,
              private store: Store,
              private auth: ApiService,
              private navigation: NavigationService) { }

  ngOnInit(): void {
    this.auth.errors$.subscribe(er => this.error = er);
    this.store.
    select((getCurrentUser))
      .subscribe(el => {
        if (el === null) {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          console.log(this.currentUser);
          if (this.currentUser) this.userLogin = this.currentUser.login;
          else { this.userLogin = undefined;}
        }
        this.currentUser = el;
        if (el && this.error === '') {
          this.userLogin = el.login;
        }
      });

  }

  switchAuthPage(page: string) {
    this.auth.errors$.next('');
    this.router.navigateByUrl(`/auth/${page}`);
    localStorage.setItem('currentPage', page);
  }

  switchPage(page: string) {
    this.router.navigateByUrl(`/${page}`);
  }

  checkPage(page: string) {
    return localStorage.getItem('currentPage') === page ? true : false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userLogin = undefined;
    this.store.dispatch(UserAction.deleteUsersActionSuccess({ empty: null }));
    this.navigation.back();
  }

  edit() {
    this.router.navigateByUrl('/auth/edit-profile');
  }
}
