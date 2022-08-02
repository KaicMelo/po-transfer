import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PoModule, PoDynamicModule, PoButtonModule, PoStepperModule, PoListViewModule, PoContainerModule, PoLoadingModule, PoWidgetModule, PoGaugeModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule.forRoot([]),
    PoDynamicModule,
    PoButtonModule,
    HttpClientModule,
    PoStepperModule,
    PoListViewModule,
    PoContainerModule,
    PoLoadingModule,
    PoWidgetModule,
    PoGaugeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
