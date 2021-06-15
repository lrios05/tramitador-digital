import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../shared/shared.module';
import { ServiceTransactionsViewsRoutingModule } from './service-transactions-views-routing.module';
import { ServiceTransactionsViewsComponent } from './service-transactions-views.component';


@NgModule({
  declarations: [
    ServiceTransactionsViewsComponent
  ],
  imports: [
    CommonModule,
    ServiceTransactionsViewsRoutingModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class ServiceTransactionsViewsModule { }
