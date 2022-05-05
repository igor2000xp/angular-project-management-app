/* eslint-disable ngrx/no-store-subscription */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ValidatorsService } from 'src/app/shared/services/validator.service';
import { User } from '../../models/user.model';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
import * as UserAction from '../../../redux/actions/user.actions';
import { getCurrentUser } from 'src/app/redux/selectors/user.selectors';
import { NavigationService } from 'src/app/shared/services/navigationService';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  editForm!: FormGroup;

  formTitle: string;

  currentUser: User;

  error: string;

  choice: boolean;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store,
    private validator: ValidatorsService,
    public auth: ApiService,
    private navigation: NavigationService) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required]),
    });
    this.store.
      select((getCurrentUser))
      .subscribe(el => {
        if (el === null) {return;}
        if (el)
          this.currentUser = el;
        this.editForm.controls.name.setValue(el.name);
        this.editForm.controls.email.setValue(el.login);
        this.editForm.controls.pass.setValue(el.password);
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditProfileModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteUser();
    });
  }

  deleteUser() {
    this.store.dispatch(UserAction.deleteUserAction({ token: this.currentUser.token, id: this.currentUser.id }));
    this.auth.errors$.next('User was deleted');
    this.router.navigateByUrl('/main');
  }

  back() {
    this.navigation.back();
  }

  // edit(){
  //   this.store.dispatch(UserAction.updateUserAction({ token: this.currentUser.token, id: this.currentUser.id, user: {} }))
  // }

}
