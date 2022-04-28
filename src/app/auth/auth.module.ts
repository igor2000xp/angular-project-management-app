import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationCardComponent } from './components/login-card/registration-card.component';

@NgModule({
  declarations: [
    RegistrationCardComponent,
  ],
  exports: [
    RegistrationCardComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AuthModule { }
