import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', loadChildren: () => import("./layout/default/default.module").then (m => m.DefaultModule)
  },
  {
    path: '', loadChildren: () => import("./layout/auth-views/login-view/login-view.module").then (m => m.LoginViewModule)
  },
  {
    path: '', loadChildren: () => import("./layout/customerview/customerview.module").then (m => m.CustomerviewModule)
  },
  {
    path: '', loadChildren: () => import("./layout/auth-views/register-view/register-view.module").then (m => m.RegisterViewModule)
  },
  {
    path: '', loadChildren: () => import("./layout/service-transactions-views/service-transactions-views.module")
              .then (m => m.ServiceTransactionsViewsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
