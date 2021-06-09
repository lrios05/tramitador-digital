import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', loadChildren: () => import("./layout/default/default.module").then (m => m.DefaultModule)
  },
  {
    path: '', loadChildren: () => import("./layout/loginview/loginview.module").then (m => m.LoginviewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
