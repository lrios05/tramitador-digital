import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RegisterViewRoutingModule } from './register-view-routing.module';
import { RegisterViewComponent } from './register-view.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    RegisterViewComponent
  ],
  imports: [
    CommonModule,
    RegisterViewRoutingModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class RegisterViewModule { }
