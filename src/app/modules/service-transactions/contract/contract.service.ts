import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contract } from '../../../models/contract/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contractURL = 'http://localhost:8080/api/contract/';

  constructor(private httpClient: HttpClient) { }

  public findContract(id: number): Observable<Contract> {
    return this.httpClient.get<Contract>(this.contractURL + `find/${id}`);
  }

  public findContractInfo(id: number): Observable<any> {
    return this.httpClient.get<any>(this.contractURL + `findinfo/${id}`);
  }

  public findByCodeAndStatus(httpParams: HttpParams): Observable<any> {
    return this.httpClient.get<any>(`${this.contractURL}find/`,{params: httpParams});
  }

  public listContracts(): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(this.contractURL + 'list');
  }

  public createContract(id: string, contract: Contract): Observable<any> {
    return this.httpClient.post<any>(this.contractURL + `signup/${id}`, contract);
  }
}
