import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppMaterialModule } from './../core/services/app-material.module';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './auth/login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { RegisterComponent } from './auth/register/register.component';
import { ClientComponent } from './service-transactions/customer/client.component';
import { CompanyComponent } from './service-transactions/company/company.component';
import { ContractComponent } from './service-transactions/contract/contract.component';
import { ServiceTransactionsComponent } from './service-transactions/service-transactions.component';
import { IndexComponent } from './index/index.component';



@NgModule({
  declarations: [
    HomeComponent,
    PostsComponent,
    LoginComponent,
    CustomerComponent,
    RegisterComponent,
    ClientComponent,
    CompanyComponent,
    ContractComponent,
    ServiceTransactionsComponent,
    IndexComponent
  ], 
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AppMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class ModulesModule { }
