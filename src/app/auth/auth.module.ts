import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginCardComponent, EditProfileComponent, EditProfileModalComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
  ],
})
export class AuthModule { }
