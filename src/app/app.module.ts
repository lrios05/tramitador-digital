import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layout/default/default.module';
import { LoginViewModule } from './layout/auth-views/login-view/login-view.module';
import { RegisterViewModule } from './layout/auth-views/register-view/register-view.module';
import { CustomerviewModule } from './layout/customerview/customerview.module';
//import { ServiceTransactionsViewsModule } from './layout/service-transactions-views/service-transactions-views.module';
//import { EvaluationModule } from './layout/evaluation-views/evaluation.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    LoginViewModule,
    RegisterViewModule,
    CustomerviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
