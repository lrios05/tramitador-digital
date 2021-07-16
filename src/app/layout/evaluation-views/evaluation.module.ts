import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ModulesModule } from '../../modules/modules.module';
import { SharedModule } from '../../shared/shared.module';
import { EvaluationRoutingModule } from './evaluation-routing.module';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ModulesModule,
    SharedModule,
    EvaluationRoutingModule
  ]
})
export class EvaluationModule { }
