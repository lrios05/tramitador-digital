import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerviewRoutingModule } from './customerview-routing.module';
import { CustomerviewComponent } from './customerview.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModulesModule } from 'src/app/modules/modules.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CustomerviewComponent
  ],
  imports: [
    CommonModule,
    CustomerviewRoutingModule,
    FlexLayoutModule,
    SharedModule,
    ModulesModule
  ]
})
export class CustomerviewModule { }
