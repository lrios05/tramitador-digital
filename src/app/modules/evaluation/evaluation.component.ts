import { HttpParams } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { status } from '../../core/constants/status';
import { SelectOption } from '../../shared/ui-elements/SelectOption';
import { ContractService } from '../service-transactions/contract/contract.service';
import { IEvaluation } from '../../core/interfaces/ievaluation';

const EVALUATION_DATA: IEvaluation[] = [
  {position: 1, date: '01/07/2021', contract: '1001-2021', customer: 'Restaurant El Pollo Gordo', status: 'Pendiente'},
  {position: 2, date: '03/07/2021', contract: '1003-2021', customer: 'Clínica de los heridos', status: 'Pendiente'},
  {position: 3, date: '05/07/2021', contract: '1005-2021', customer: 'Servicios de aseo urbano', status: 'Pendiente'},
  {position: 4, date: '01/07/2021', contract: '1001-2021', customer: 'Restaurant El Pollo Gordo', status: 'Aprobado'}
];

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {

  contractStatus: SelectOption[] = status;
  contractDetails = [];
  displayedColumns: string[] = ['position', 'date', 'contract', 'customer', 'status'];
  dataSource = EVALUATION_DATA;

  constructor(private formBuilder: FormBuilder, private contractService: ContractService) { }

  ngOnInit(): void {
  }

  searchForm = this.formBuilder.group({
    code: '',
    status: ''
  });

  onSearch(){
    let httpParams = new HttpParams();
    httpParams = httpParams.set('code', this.searchForm.get('code')?.value);
    httpParams = httpParams.set('status', this.searchForm.get('status')?.value);
    
    this.contractService.findByCodeAndStatus(httpParams).subscribe(
      data => {
        let res: any = data;
        this.contractDetails = res.payload;
        console.log(this.contractDetails);
      }, err => {
        console.log(err);
      }
    );
  }


}
