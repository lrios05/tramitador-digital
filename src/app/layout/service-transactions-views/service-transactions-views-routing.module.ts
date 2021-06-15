import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceTransactionsComponent } from 'src/app/modules/service-transactions/service-transactions.component';
import { ServiceTransactionsViewsComponent } from './service-transactions-views.component';


const routes: Routes = [
  {
    path: '', component: ServiceTransactionsViewsComponent,
    children: [
      {
        path: 'transaction', component: ServiceTransactionsComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceTransactionsViewsRoutingModule { }
