import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { TokenService } from '../../../../services/token.service';
import { ContractService } from '../../../service-transactions/contract/contract.service';
import { CompanyService } from '../../../service-transactions/company/company.service';

import jsPDF from 'jspdf';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';


@Component({
  selector: 'app-infectius',
  templateUrl: './infectius.component.html',
  styleUrls: ['./infectius.component.scss']
})
export class InfectiusComponent implements OnInit {

  currentDate = new Date();
  contractInfo: any = {};
  customerInfo: any = {};
  businessInfo: any = {};

  @ViewChild('pdfTable') pdfTable?: ElementRef;

  constructor(private contractService: ContractService,
              private companyService: CompanyService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getContract();
  }

  getContract(){
    //let contractId: number = 3;
    let contractId: any = this.tokenService.getContract();

    this.contractService.findContractInfo(contractId).subscribe(
      (data: any) => {
        this.contractInfo = data.payload;
        this.customerInfo = this.contractInfo.customerInfo;
        this.getCustomerBusinessInfo(this.customerInfo.customerId);
      }
    );
  }

  private getCustomerBusinessInfo(customerId: any) {
    this.companyService.findBusinessInfo(customerId).subscribe(
      (data: any) => {
        this.businessInfo = data.payload;
      }
    );
  }

  // to render Html to pdf
  public downloadAsPDF() {
    const doc = new jsPDF();
    
    const pdfTable = this.pdfTable!.nativeElement;
    
    var html = htmlToPdfmake(pdfTable.innerHTML);
      
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
      
  }

  // npm i --save-dev @types/pdfmake

 // npm i --save-dev @types/html-to-pdfmake

}
