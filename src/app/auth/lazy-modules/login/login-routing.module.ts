import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileClass } from 'src/app/guards/edit-profile.guard';
import { EntryLoginClass } from 'src/app/guards/entry-login-guard';
import { EditProfileComponent } from '../../components/edit-profile/edit-profile.component';
import { LoginCardComponent } from '../../components/login-card/login-card.component';


const routes: Routes = [
  {
    path: 'registration', component: LoginCardComponent,
    canActivate: [EntryLoginClass],
  },
  {
    path: 'authorization', component: LoginCardComponent,
    canActivate: [EntryLoginClass],
  },
  {
    path: 'edit-profile', component: EditProfileComponent,
    canActivate: [EditProfileClass],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
