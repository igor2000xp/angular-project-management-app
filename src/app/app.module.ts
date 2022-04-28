import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pm/pages/main-page/main-page.component';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/components/header/header.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
