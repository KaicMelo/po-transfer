import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PoModule, PoDynamicModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule.forRoot([]),
    PoDynamicModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
