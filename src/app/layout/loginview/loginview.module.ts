import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginviewRoutingModule } from './loginview-routing.module';
import { LoginviewComponent } from './loginview.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LoginviewComponent
  ],
  imports: [
    CommonModule,
    LoginviewRoutingModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class LoginviewModule { }
