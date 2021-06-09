import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { DefaultComponent } from './default.component';

const routes: Routes = [
  {
    path: '', component: DefaultComponent, 
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'posts', component: PostsComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
