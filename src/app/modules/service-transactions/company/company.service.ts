import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Business } from '../../../models/business/business';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private businessURL = 'http://localhost:8080/api/business/';

  constructor(private httpClient: HttpClient) { }

  public findBusiness(id: number): Observable<Business> {
    return this.httpClient.get<Business>(this.businessURL + `find/${id}`);
  }

  public findByCustomerId(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.businessURL}/findcustomer/${id}`);
  }

  public listBusiness(): Observable<Business[]> {
    return this.httpClient.get<Business[]>(this.businessURL + 'list');
  }

  public createBusiness(id: string, business: Business): Observable<any> {
    return this.httpClient.post<any>(this.businessURL + `signup/${id}`, business);
  }

}
