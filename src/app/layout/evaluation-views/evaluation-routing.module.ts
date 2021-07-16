import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { EvaluationComponent } from '../../modules/evaluation/evaluation.component';

const routes: Routes = [
  {
    path: '', component: SearchComponent,
      children: [
        {
          path: 'search', component: EvaluationComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
