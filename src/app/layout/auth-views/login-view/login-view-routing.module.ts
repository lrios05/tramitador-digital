import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { LoginViewComponent } from './login-view.component';

const routes: Routes = [
  {
    path: '', component: LoginViewComponent, 
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
export class LoginViewRoutingModule { }
