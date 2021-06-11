import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from 'src/app/modules/customer/customer.component';
import { CustomerviewComponent } from './customerview.component';

const routes: Routes = [
  {
    path: '', component: CustomerviewComponent,
    children: [
      { 
        path: 'customer', component: CustomerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerviewRoutingModule { }
