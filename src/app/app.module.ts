import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaModule } from 'ng2-dragula';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
// import { metaReducers, reducers } from './redux/reducers';
import * as fromUser from './redux/reducers/user.reducer';
import * as fromTask from './redux/reducers/task.reducer';
import { EffectsModule } from '@ngrx/effects';
// import { AppEffects } from './redux/effects/app.effects';
import { UserEffects } from './redux/effects/user.effects';
import { PmModule } from './pm/pm.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        tasks: fromTask.taskReducer,
        users: fromUser.userReducer,
      }, {
      // metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      }),
    // StoreModule.forFeature('taskState', taskReducer),
    EffectsModule.forRoot([UserEffects]),
    DragulaModule.forRoot(),
    PmModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
