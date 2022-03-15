import { HttpParams } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { Status } from '../../core/constants/status';
import { SelectOption } from '../../shared/ui-elements/SelectOption';
import { ContractService } from '../service-transactions/contract/contract.service';
import { CompanyService } from '../service-transactions/company/company.service';
import { IEvaluation } from '../../core/interfaces/ievaluation';


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {

  contractStatus: SelectOption[] = Status;
  contractDetails = [];
  displayedColumns: string[] = ['position', 'date', 'contract', 'customer', 'status'];
  dataTable: IEvaluation[] = [];

  dataSource = new MatTableDataSource<IEvaluation>(this.dataTable);

  @ViewChild(MatTable) tabla1: MatTable<IEvaluation> | undefined;

  customerBusiness: any;
  customerName: string = '';

  constructor(private formBuilder: FormBuilder,
              private contractService: ContractService,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getDefaultList();
  }

  searchForm = this.formBuilder.group({
    code: '',
    status: ''
  });

  onSearch() {
    this.dataTable = [];
    let httpParams = new HttpParams();
    httpParams = httpParams.set('code', this.searchForm.get('code')?.value);
    httpParams = httpParams.set('status', this.searchForm.get('status')?.value);

    this.getSearchList(httpParams);
  }

  private getDefaultList() {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('code', '');
    httpParams = httpParams.set('status', 'Pendiente');

    this.getSearchList(httpParams);
  }

  private getSearchList(params: HttpParams): void {
    this.contractService.findByCodeAndStatus(params).subscribe(
      data => {
        let res: any = data;
        this.contractDetails = res.payload;
        this.getCustomerBusiness();
      }, err => {
        console.log(err);
      }
    );
  }

  private getCustomerBusiness(): void {
  
    this.contractDetails.map(contract => {
      let customerId = contract['customerDto']['customerId'];

      this.companyService.findByCustomerId(customerId).subscribe(
        (data: any) => {
          this.customerBusiness = data.payload;
          console.log(this.customerBusiness);
          this.customerName = this.customerBusiness['name'];

          this.dataTable.push({
            position: customerId,
            date: contract['initDate'],
            contract: contract['contractCode'],
            customer: this.customerName,
            status: contract['status']
          });
          this.dataSource = new MatTableDataSource<IEvaluation>(this.dataTable);
          this.tabla1?.renderRows();
        }
      );
    });
  }
}
