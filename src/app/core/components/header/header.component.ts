/* eslint-disable ngrx/no-store-subscription */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
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

  checkedq = false;

  checked: boolean = JSON.parse(localStorage.getItem('toggle'));

  constructor(private router: Router, public translate: TranslateService,
    private store: Store,
    private auth: ApiService,
    private navigation: NavigationService) { }

  ngOnInit(): void {
    this.auth.errors$.subscribe(er => this.error = er);
    this.store.
      select((getCurrentUser))
      .subscribe(() => {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) this.userLogin = this.currentUser.login;
        else { this.userLogin = undefined; }
      });
    this.translate.use(localStorage.getItem('translate') || 'en');
  }

  check() {
    this.checked = !this.checked;
    if (this.checked) {
      this.translate.use('ru');
      localStorage.setItem('translate', 'ru');
    } else {
      this.translate.use('en');
      localStorage.setItem('translate', 'en');
    }
    localStorage.setItem('toggle', this.checked + '');

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
