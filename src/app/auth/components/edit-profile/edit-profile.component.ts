import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getCurrentUser } from 'src/app/redux/selectors/user.selectors';
import { ValidatorsService } from 'src/app/shared/services/validator.service';
import * as UserAction from '../../../redux/actions/user.actions';
import { User } from '../../models/user.model';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  form!: FormGroup;

  path: string;

  formTitle: string;

  currentUser: User;

  error: string;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private store: Store, private validator: ValidatorsService, public auth: ApiService) { }

  ngOnInit(): void {}



  openDialog() {
    const dialogRef = this.dialog.open(EditProfileModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}