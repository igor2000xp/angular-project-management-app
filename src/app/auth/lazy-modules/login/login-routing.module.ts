import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationCardComponent } from '../../components/login-card/registration-card.component';


const routes: Routes = [
  { path:'registration', component:RegistrationCardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
