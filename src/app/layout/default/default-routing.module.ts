import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { DefaultComponent } from './default.component';
import { DataReviewComponent } from '../../modules/evaluation/data-review/data-review.component';
import { NoteComponent } from '../../modules/follow-ups/note/note.component';
import { DetailComponent } from '../../modules/follow-ups/detail/detail.component';
import { ReviewComponent } from '../../modules/follow-ups/review/review.component';
import { EvaluationComponent } from '../../modules/evaluation/evaluation.component';
import { CheckoutComponent } from '../../modules/follow-ups/checkout/checkout.component';

const routes: Routes = [
  {
    path: '', component: DefaultComponent, 
    children: [
      {
        path: 'home', component: HomeComponent
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
        path: 'forward', component: DetailComponent
      },
      {
        path: 'notesearch', component: ReviewComponent
      },
      {
        path: 'checkout/:id', component: CheckoutComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
