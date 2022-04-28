import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pm/pm.module').then((m) => m.PmModule),
  },
  {
    path: 'auth',
    pathMatch: 'full',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  // { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
