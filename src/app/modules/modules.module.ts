import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './../core/services/app-material.module';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './auth/login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { RegisterComponent } from './auth/register/register.component';


@NgModule({
  declarations: [
    HomeComponent,
    PostsComponent,
    LoginComponent,
    CustomerComponent,
    RegisterComponent
  ], 
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class ModulesModule { }
