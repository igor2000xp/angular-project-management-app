import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationCardComponent } from './components/login-card/registration-card.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [RegistrationCardComponent],
  imports: [
    AuthRoutingModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }
