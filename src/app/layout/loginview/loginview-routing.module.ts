import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../modules/auth/login/login.component';
import { LoginviewComponent } from './loginview.component';


const routes: Routes = [
  {
    path: '', component: LoginviewComponent, 
    children: [
      {
        path: 'login', component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginviewRoutingModule { }
