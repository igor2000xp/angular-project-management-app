/* eslint-disable @typescript-eslint/default-param-last */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  form!: FormGroup;

  path: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, this.checkNameForLength]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, this.checkForLength, this.checkUpperLower, this.checkMixture, this.checkSpecialChar]),
    });
    this.route.url.subscribe(el => this.path = el[0].path);
    console.log(this.form);
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

  submit() {
    const USER: User = {
      name: this.form.value.name,
      login: this.form.value.email,
      password: this.form.value.pass,
    };
    this.apiService.authenticate(USER, 'signup').subscribe(el => console.log(el));
  }

  checkRegPage() {
    return this.path === 'registration' ? true : false;
  }

  checkLogPage() {
    return this.path === 'login' ? true : false;
  }
}
