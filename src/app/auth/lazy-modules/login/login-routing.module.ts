import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCardComponent } from '../../components/login-card/login-card.component';


const routes: Routes = [
  { path:'registration', component:LoginCardComponent },
  { path:'authorization', component:LoginCardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
