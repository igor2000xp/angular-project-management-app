import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLogOutClass } from 'src/app/guards/user-logout.guard';
import { UserLogInClass } from 'src/app/guards/user-login.guard';
import { EditProfileComponent } from '../../components/edit-profile/edit-profile.component';
import { LoginCardComponent } from '../../components/login-card/login-card.component';


const routes: Routes = [
  {
    path: 'registration', component: LoginCardComponent,
    canActivate: [UserLogOutClass],
  },
  {
    path: 'authorization', component: LoginCardComponent,
    canActivate: [UserLogOutClass],
  },
  {
    path: 'edit-profile', component: EditProfileComponent,
    canActivate: [UserLogInClass],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
