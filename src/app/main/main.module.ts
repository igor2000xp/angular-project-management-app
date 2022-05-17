import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, DragulaModule, TranslateModule ],
})
export class MainModule {}
