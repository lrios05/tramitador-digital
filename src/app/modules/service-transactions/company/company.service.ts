import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {map} from 'rxjs/operators';

import { Business } from '../../../models/business/business';
import { IBusiness } from 'src/app/core/interfaces/ibusiness';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private businessURL = 'http://localhost:8080/api/business/';

  constructor(private httpClient: HttpClient) { }

  public findBusiness(id: number): Observable<Business> {
    return this.httpClient.get<Business>(this.businessURL + `find/${id}`);
  }

  public findBusinessInfo(id: number): Observable<any> {
    return this.httpClient.get<any>(this.businessURL + `findinfo/${id}`);
  }
/*
  public findByCustomerId(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.businessURL}findcustomer/${id}`);
  }
*/

  public findByCustomerId(id: number): Observable<any> {
    return this.httpClient.get(`${this.businessURL}findcustomer/${id}`).pipe(map((res: any) => res));
  }


  public listBusiness(): Observable<Business[]> {
    return this.httpClient.get<Business[]>(this.businessURL + 'list');
  }

  public createBusiness(id: string, business: Business): Observable<any> {
    return this.httpClient.post<any>(this.businessURL + `signup/${id}`, business);
  }

}
