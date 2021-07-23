import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../../models/customer/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  customerURL = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  public findCustomer(id: number): Observable<Client> {
    return this.httpClient.get<Client>(this.customerURL + `customer/find/${id}`);
  } 

  public listAll(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.customerURL + `customer/list`);
  }

  public signup(usrEmail: string, client: Client): Observable<any>{
    return this.httpClient.post<any>(this.customerURL + `customer/signup/${usrEmail}`, client);
  }
}
