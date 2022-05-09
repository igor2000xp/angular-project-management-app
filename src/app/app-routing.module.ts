import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLogInClass } from './guards/user-login.guard';
import { BoardPageComponent } from './pm/pages/board-page/board-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', loadChildren: () => import('./main/main.module').then((m) => m.MainModule) },
  {
    path: 'home',
    loadChildren: () => import('./pm/pm.module').then((m) => m.PmModule),
    canActivate:[UserLogInClass],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/lazy-modules/login/login.module').then((m) => m.LoginModule),
  },
  { path: 'board', component: BoardPageComponent },
  { path: 'board/:id',
    loadChildren: () => import('./pm/pm.module').then((m) => m.PmModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
