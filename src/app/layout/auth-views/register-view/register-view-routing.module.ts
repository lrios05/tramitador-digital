import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from 'src/app/modules/auth/register/register.component';
import { RegisterViewComponent } from './register-view.component';

const routes: Routes = [
  {
    path: '', component: RegisterViewComponent,
    children: [
      {
        path: 'register', component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterViewRoutingModule { }
