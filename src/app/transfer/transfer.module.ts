import { HttpClientModule } from '@angular/common/http';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoModule, PoDynamicModule, PoStepperModule, PoWidgetModule, PoNotificationModule } from '@po-ui/ng-components';
import { TransferRoutingModule } from './transfer-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferComponent } from './transfer.component';



@NgModule({
  declarations: [
    TransferComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    PoTemplatesModule,
    PoDynamicModule,
    HttpClientModule,
    PoStepperModule,
    PoWidgetModule,
    TransferRoutingModule,
    PoNotificationModule
  ]
})
export class TransferModule { }
