/* eslint-disable @typescript-eslint/default-param-last */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createUserAction } from 'src/app/redux/reducers';
import { ApiService } from '../../services/api.service';
import * as UserAction from '../../../redux/actions/user.actions';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  form!: FormGroup;

  path: string;

  formTitle: string;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.route.url.subscribe(el => this.path = el[0].path);
    this.form = this.path === 'registration' ? this.createForm('signup') :  this.createForm('signin');
    this.formTitle = this.path === 'registration' ? 'Registration' : 'Authorization';
  }

  createForm(action:string) {
    if (action === 'signup') {
      return new FormGroup({
        name: new FormControl('', [Validators.required, this.checkNameForLength]),
        email: new FormControl('', [Validators.required, Validators.email]),
        pass: new FormControl('', [Validators.required, this.checkForLength, this.checkUpperLower, this.checkMixture, this.checkSpecialChar]),
      });
    }
    if (action === 'signin') {
      return new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        pass: new FormControl('', [Validators.required, this.checkForLength, this.checkUpperLower, this.checkMixture, this.checkSpecialChar]),
      });
    }
  }

  checkForLength(control: FormControl) {
    if (control.value.length === 0) { return; }

    if (control.value.length < 8) {
      return {
        lengthError: true,
      };
    }
  }

  checkNameForLength(control: FormControl) {
    if (control.value.length === 0) { return; }

    if (control.value.length < 5) {
      return {
        lengthError: true,
      };
    }
  }

  checkUpperLower(control: FormControl) {
    const rexP: RegExp = /(?=.*[a-z])(?=.*[A-Z])/;
    if (control.value.length === 0) { return; }

    if (!control.value.match(rexP)) {
      return {
        upperLowerError: true,
      };
    }
  }

  checkMixture(control: FormControl) {
    const rexP: RegExp = /[A-Z][a-z]+/;
    const rexP2: RegExp = /[0-9]+/;
    if (control.value.length === 0) { return; }
    if (!control.value.match(rexP) && !control.value.match(rexP2)) {
      return {
        mixtureError: true,
      };
    }
  }

  checkSpecialChar(control: FormControl) {
    const rexP: RegExp = /[!@#$&*%]+/;
    if (control.value.length === 0) { return; }
    if (!control.value.match(rexP)) {
      return {
        specialCharError: true,
      };
    }
  }

  userInfo(action:string) {
    if (action === 'signup') {
      return {
        name: this.form.value.name,
        login: this.form.value.email,
        password: this.form.value.pass,
      };
    }
    if (action === 'signin') {
      return {
        login: this.form.value.email,
        password: this.form.value.pass,
      };
    }

  }

  submit() {
    if (this.path === 'registration') {
      this.apiService.authenticate(this.userInfo('signup'), 'signup').subscribe(el => console.log(el));
      return;
    } else {
      this.apiService.authenticate(this.userInfo('signin'), 'signin').subscribe(el => console.log(el));
      return;
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

  aaa(){
    this.store.dispatch(UserAction.getUsersAction({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlYjVkYTViNS1mNGMyLTQwZGEtOGRlNi1jMjA4OWQ1NTJjNTkiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTEzNDYwMzR9._t-Bs2WNpDHNExGaKt6sXotWEqCBWnvYhBlJLE_e1dM'}));
  }
}
