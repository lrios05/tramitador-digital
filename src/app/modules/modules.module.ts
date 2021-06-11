import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './auth/login/login.component';
import { AppMaterialModule } from './../core/services/app-material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomerComponent } from './customer/customer.component';


@NgModule({
  declarations: [
    HomeComponent,
    PostsComponent,
    LoginComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class ModulesModule { }
