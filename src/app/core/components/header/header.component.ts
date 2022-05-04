/* eslint-disable ngrx/no-store-subscription */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';
import { ApiService } from 'src/app/auth/services/api.service';
import * as UserAction from '../../../redux/actions/user.actions';
import { getCurrentUser } from 'src/app/redux/selectors/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  userLogin: string;

  error: string;

  currentUser: User;

  constructor(private router: Router, private store: Store, private route: ActivatedRoute, private auth: ApiService) { }

  ngOnInit(): void {
    this.auth.errors$.subscribe(er => this.error = er);
    this.store.
      select((getCurrentUser))
      .subscribe(el => {
        if (el === null) {this.userLogin = undefined; return;}
        this.currentUser = el;
        if (el && this.error === '') {
          this.userLogin = el.login;
        }
      });
  }

  switchAuthPage(page: string) {
    this.router.navigateByUrl(`/auth/${page}`);
    localStorage.setItem('currentPage', page);
  }

  goToHomePage() {
    this.router.navigateByUrl('/home');
  }

  checkPage(page: string) {
    return localStorage.getItem('currentPage') === page ? true : false;
  }

  deleteUser() {
    this.store.dispatch(UserAction.deleteUserAction({ token: this.currentUser.token, id: this.currentUser.id }));
    this.auth.errors$.next('User was deleted');
  }

  logout() {
    this.store.dispatch(UserAction.deleteUsersActionSuccess({ empty: null }));
  }

}
