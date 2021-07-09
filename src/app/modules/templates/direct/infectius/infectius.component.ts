import { Component, OnInit } from '@angular/core';

import { TokenService } from '../../../../services/token.service';
import { ContractService } from '../../../service-transactions/contract/contract.service';


@Component({
  selector: 'app-infectius',
  templateUrl: './infectius.component.html',
  styleUrls: ['./infectius.component.scss']
})
export class InfectiusComponent implements OnInit {

  docTemplate: any = {};

  constructor(private contractService: ContractService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getContract();
  }

  getContract(){
    const contractId: any = this.tokenService.getContract();

    this.contractService.findContract(contractId).subscribe(
      data => {
        let res: any = data;
        this.docTemplate = res;
        console.log(res.payload)
        console.log(this.docTemplate.payload);
      }
    );
  }

}
