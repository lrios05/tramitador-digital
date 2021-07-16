import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { BusinessTypeComponent } from './service-transactions/business-type/business-type.component';
import { ActivityGroupComponent } from './service-transactions/activity-group/activity-group.component';
import { ActivityComponent } from './service-transactions/activity/activity.component';
import { ServiceTypeComponent } from './service-transactions/service-type/service-type.component';
import { ServiceOfferComponent } from './service-transactions/service-offer/service-offer.component';
import { WasteTypeComponent } from './service-transactions/waste-type/waste-type.component';
import { UnitComponent } from './service-transactions/unit/unit.component';
import { PaymentTypeComponent } from './service-transactions/payment-type/payment-type.component';
import { PaymentFrequencyComponent } from './service-transactions/payment-frequency/payment-frequency.component';
import { GatherFrequencyComponent } from './service-transactions/gather-frequency/gather-frequency.component';
import { InfectiusComponent } from './templates/direct/infectius/infectius.component';
import { SolidsComponent } from './templates/direct/solids/solids.component';
import { FileComponent } from './updown/file.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { DataReviewComponent } from './evaluation/data-review/data-review.component';
import { ObservationComponent } from './evaluation/observation/observation.component';


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
    IndexComponent,
    BusinessTypeComponent,
    ActivityGroupComponent,
    ActivityComponent,
    ServiceTypeComponent,
    ServiceOfferComponent,
    WasteTypeComponent,
    UnitComponent,
    PaymentTypeComponent,
    PaymentFrequencyComponent,
    GatherFrequencyComponent,
    InfectiusComponent,
    SolidsComponent,
    FileComponent,
    EvaluationComponent,
    DataReviewComponent,
    ObservationComponent
  ], 
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AppMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ModulesModule { }
