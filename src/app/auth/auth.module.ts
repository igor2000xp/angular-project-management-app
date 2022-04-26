import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginCardComponent } from './components/login-card/login-card.component';

@NgModule({
  declarations: [
    LoginCardComponent,
  ],
  exports: [
    LoginCardComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AuthModule { }
