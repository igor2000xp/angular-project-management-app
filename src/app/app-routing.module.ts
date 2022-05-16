import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLogInClass } from './guards/user-login.guard';
import { UserLogOutClass } from './guards/user-logout.guard';
import { BoardPageComponent } from './pm/pages/board-page/board-page.component';
import { NotFoundComponent } from './pm/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome', loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    canActivate: [UserLogOutClass],
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pm/pm.module').then((m) => m.PmModule),
  //   canActivate: [UserLogInClass],
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/lazy-modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'board', component: BoardPageComponent,
    canActivate: [UserLogInClass],
  },
  {
    path: 'board/:id',
    loadChildren: () => import('./pm/pm.module').then((m) => m.PmModule),
    canActivate: [UserLogInClass],
  },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
