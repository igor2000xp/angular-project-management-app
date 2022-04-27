import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  form!: FormGroup;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, this.checkForLength, this.checkUpperLower, this.checkMixture, this.checkSpecialChar]),
    });
  }

  checkForLength(control: FormControl) {
    if (control.value.length === 0) { return; }

    if (control.value.length < 8) {
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

  submit(login: string, password: string) {
    const USER: User = {
      name: '123',
      login: login,
      password: password,
    };
    this.apiService.authenticate(USER, 'signup').subscribe(el => console.log(el));
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlYjVkYTViNS1mNGMyLTQwZGEtOGRlNi1jMjA4OWQ1NTJjNTkiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTEwODk1NzJ9.Q5oUjH4kPnZSjzQawZEDIoYjRwdAHFZ2Vxn4zY_kdJ0';

    this.apiService.createTask(token, '8aa1f57a-bd5c-46a9-95e6-3891eca65511', '3793bbb5-b3c5-4e4e-822a-5a13335a3362', {
      'title': 'Task: pet the cat',
      'order': 1,
      'description': 'Domestic cat needs to be stroked gently',
      'userId': '40af606c-c0bb-47d1-bc20-a2857242cde3',
    }).subscribe(el => console.log(el));
  }
}
