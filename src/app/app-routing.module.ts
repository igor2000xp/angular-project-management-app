import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginClass } from './guards/check-login.guard';
import { EntryLoginClass } from './guards/entry-login-guard';
import { BoardPageComponent } from './pm/pages/board-page/board-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', loadChildren: () => import('./main/main.module').then((m) => m.MainModule) },
  {
    path: 'home',
    loadChildren: () => import('./pm/pm.module').then((m) => m.PmModule),
    canActivate:[CheckLoginClass],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/lazy-modules/login/login.module').then((m) => m.LoginModule),
    canActivate:[EntryLoginClass],
  },
  { path: 'board', component: BoardPageComponent },
  //   path: 'registration',
  //   loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  // },

  // { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
