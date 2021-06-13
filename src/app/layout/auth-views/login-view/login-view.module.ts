import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../../shared/shared.module';
import { LoginViewRoutingModule } from './login-view-routing.module';
import { LoginViewComponent } from './login-view.component';


@NgModule({
  declarations: [
    LoginViewComponent
  ],
  imports: [
    CommonModule,
    LoginViewRoutingModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class LoginViewModule { }
