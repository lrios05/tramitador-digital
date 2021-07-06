import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Business } from '../../../models/business/business';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  businessURL = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  public findBusiness(id: number): Observable<Business> {
    return this.httpClient.get<Business>(this.businessURL + `business/find/${id}`);
  }

  public listBusiness(): Observable<Business[]> {
    return this.httpClient.get<Business[]>(this.businessURL + 'business/list');
  }

  public createBusiness(id: string, business: Business): Observable<any> {
    return this.httpClient.post<any>(this.businessURL + `business/signup/${id}`, business);
  }

}
