import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragulaModule } from 'ng2-dragula';

import { PmRoutingModule } from './pm-routing.module';
import { PmComponent } from './pm.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ToolsMenuComponent } from './components/tools-menu/tools-menu.component';
import { ColumnModalComponent } from './components/column-modal/column-modal.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { ColumnCardComponent } from './components/column-card/column-card.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskCardModalComponent } from './components/task-card-modal/task-card-modal.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardMenuComponent } from './components/board-menu/board-menu.component';
import { BoardCardModalComponent } from './components/board-card-modal/board-card-modal.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { DeleteBoardModalComponent } from './components/delete-board-modal/delete-board-modal.component';
import { DeleteColumModalComponent } from './components/delete-colum-modal/delete-colum-modal.component';



@NgModule({
  declarations: [
    PmComponent,
    MainPageComponent,
    ToolsMenuComponent,
    ColumnModalComponent,
    TaskModalComponent,
    ColumnCardComponent,
    TaskCardComponent,
    TaskCardModalComponent,
    BoardPageComponent,
    BoardMenuComponent,
    BoardCardModalComponent,
    BoardCardComponent,
    DeleteBoardModalComponent,
    DeleteColumModalComponent,
  ],
  imports: [
    CommonModule,
    PmRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    DragulaModule,
  ],
})
export class PmModule { }
