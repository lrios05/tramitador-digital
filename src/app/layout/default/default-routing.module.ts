import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { CustomerComponent } from 'src/app/modules/customer/customer.component';
import { DefaultComponent } from './default.component';
import { DataReviewComponent } from '../../modules/evaluation/data-review/data-review.component';
import { NoteComponent } from '../../modules/follow-ups/note/note.component';
import { DetailComponent } from '../../modules/follow-ups/detail/detail.component';
import { ReviewComponent } from '../../modules/follow-ups/review/review.component';
import { EvaluationComponent } from '../../modules/evaluation/evaluation.component';
import { CheckoutComponent } from '../../modules/follow-ups/checkout/checkout.component';
import { LoginComponent } from '../../modules/auth/login/login.component';
import { RegisterComponent } from '../../modules/auth/register/register.component';
import { ServiceTransactionsComponent } from '../../modules/service-transactions/service-transactions.component';
import { FileComponent } from '../../modules/updown/file.component';
import { InfectiusComponent } from '../../modules/templates/direct/infectius/infectius.component';
import { ApisignatureComponent } from '../../modules/signature/apisignature/apisignature.component';


const routes: Routes = [
  {
    path: '', component: DefaultComponent, 

    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'customer', component: CustomerComponent
      },
      {
        path: 'account', component: RegisterComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'servicetransaction', component: ServiceTransactionsComponent
      },
      {
        path: 'uploads', component: FileComponent
      },
      {
        path: 'review/:id', component: DataReviewComponent
      },
      {
        path: 'contractsearch', component: EvaluationComponent
      },
      {
        path: 'note', component: NoteComponent
      },
      {
        path: 'forward/:id', component: DetailComponent
      },
      {
        path: 'notesearch', component: ReviewComponent
      },
      {
        path: 'checkout/:id/:action', component: CheckoutComponent
      },
      {
        path: 'template', component: InfectiusComponent
      },
      {
        path: 'updownfile', component: ApisignatureComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
