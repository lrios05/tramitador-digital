import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { DefaultComponent } from './default.component';
import { DataReviewComponent } from '../../modules/evaluation/data-review/data-review.component';

const routes: Routes = [
  {
    path: '', component: DefaultComponent, 
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'review', component: DataReviewComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
