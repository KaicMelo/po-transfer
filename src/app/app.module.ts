import { ReportModule } from './report/report.module';
import { TransferModule } from './transfer/transfer.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoDynamicModule, PoModule, PoStepperModule, PoWidgetModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    TransferModule,
    ReportModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
