/* eslint-disable @typescript-eslint/default-param-last */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ValidatorsService } from 'src/app/shared/services/validator.service';
import * as UserAction from '../../../redux/actions/user.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  form!: FormGroup;

  path: string;

  formTitle: string;

  currentUser: User;


  constructor(private route: ActivatedRoute, private router: Router, private store: Store, private validator: ValidatorsService) { }

  ngOnInit(): void {
    this.route.url.subscribe(el => this.path = el[0].path);
    this.form = this.path === 'registration' ? this.createForm('signup') : this.createForm('signin');
    this.formTitle = this.path === 'registration' ? 'Registration' : 'Authorization';
  }

  createForm(action: string) {
    if (action === 'signup') {
      return new FormGroup({
        name: new FormControl('', [Validators.required, this.validator.checkNameForLength]),
        email: new FormControl('', [Validators.required, Validators.email]),
        pass: new FormControl('', [Validators.required, this.validator.checkForLength, this.validator.checkUpperLower, this.validator.checkMixture, this.validator.checkSpecialChar]),
      });
    }
    if (action === 'signin') {
      return new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        pass: new FormControl('', [Validators.required, this.validator.checkForLength, this.validator.checkUpperLower, this.validator.checkMixture, this.validator.checkSpecialChar]),
      });
    }
  }

  checkError(formControlName: string) {
    return (this.form.get(formControlName).dirty && this.form.get(formControlName).invalid) ? true : false;
  }
  viewError(formControlName: string, errorName: string) {
    return (this.form.get(formControlName).errors?.[errorName]) ? true : false;
  }

  userInfo(action: string) {
    if (action === 'signup')
      return {
        name: this.form.value.name,
        login: this.form.value.email,
        password: this.form.value.pass,
      };
    if (action === 'signin') {
      return {
        login: this.form.value.email,
        password: this.form.value.pass,
      }
    }
  }

  submit() {
    if (this.path === 'registration') {
      const currentUser = this.userInfo('signup');
      this.store.dispatch(UserAction.createUserAction({ currentUser: currentUser }));
      this.router.navigateByUrl('main');
    } else {
      const currentUser = this.userInfo('signin');
      this.store.dispatch(UserAction.createTokenAction({ currentUser: currentUser }));
      this.router.navigateByUrl('main');
    }
  }

  checkRegPage() {
    return this.path === 'registration' ? true : false;
  }

  checkLogPage() {
    return this.path === 'authorization' ? true : false;
  }

  goToRegPage() {
    this.router.navigateByUrl('/auth/registration');
  }

}
