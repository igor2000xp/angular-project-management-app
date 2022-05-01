import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PmRoutingModule } from './pm-routing.module';
import { PmComponent } from './pm.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ToolsMenuComponent } from './components/tools-menu/tools-menu.component';
import { ColumnModalComponent } from './components/column-modal/column-modal.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';



@NgModule({
  declarations: [
    PmComponent,
    MainPageComponent,
    ToolsMenuComponent,
    ColumnModalComponent,
    TaskModalComponent,
  ],
  imports: [
    CommonModule,
    PmRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,

  ],
})
export class PmModule { }
