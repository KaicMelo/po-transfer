import { PoModule, PoTableModule } from '@po-ui/ng-components';
import { ReportRoutingModule } from './report-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';



@NgModule({
  declarations: [
    ReportComponent,
  ],
  imports: [
    CommonModule,
    PoModule,
    ReportRoutingModule,
    PoTableModule
  ]
})
export class ReportModule { }
