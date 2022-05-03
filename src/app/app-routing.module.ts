import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginClass } from './guards/check-login.guard';

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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
