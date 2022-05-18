import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaModule } from 'ng2-dragula';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from './redux/reducers';
import { taskReducer } from './redux/reducers';
import { ColumnReducer } from './redux/reducers/column.reducer';
import * as fromUser from './redux/reducers/user.reducer';
import * as fromTask from './redux/reducers/task.reducer';
import * as fromBoard from './redux/reducers/board.reducer';
import * as fromColumn from './redux/reducers/column.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './redux/effects/user.effects';
import { PmModule } from './pm/pm.module';
import { BoardEffects } from './redux/effects/board.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ColumnEffects } from './redux/effects/column.effects';
import { TaskEffects } from './redux/effects/task.effects';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(
      {
        tasks: fromTask.taskReducer,
        users: fromUser.userReducer,
        boards: fromBoard.boardReducer,
        columns: fromColumn.ColumnReducer,
      }, {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      }),
    StoreModule.forFeature('boards', boardReducer),
    StoreModule.forFeature('columns', ColumnReducer),
    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forRoot([
      UserEffects,
      BoardEffects,
      ColumnEffects,
      TaskEffects,
    ]),
    DragulaModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    PmModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
