import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contract } from '../../../models/contract/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contractURL = 'http://localhost:8080/api/contract/';

  constructor(private httpClient: HttpClient) { }

  public findContract(id: string): Observable<Contract> {
    return this.httpClient.get<Contract>(this.contractURL + `find/${id}`);
  }

  public listContracts(): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(this.contractURL + 'list');
  }

  public createContract(id: string, contract: Contract): Observable<any> {
    return this.httpClient.post<any>(this.contractURL + `signup/${id}`, contract);
  }
}
