import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules,
  ],
})
export class SharedModule { }
