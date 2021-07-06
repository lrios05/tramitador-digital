import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BusinessType } from '../../../models/business/business-type';

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {

  businessTypeURL = 'http://localhost:8080/api/business/';

  constructor(private httpClient: HttpClient) { }

  public findType(id: number): Observable<BusinessType> {
    return this.httpClient.get<BusinessType>(this.businessTypeURL + `findtype/${id}`);
  }

  public listTypes(): Observable<BusinessType[]> {
    return this.httpClient.get<BusinessType[]>(this.businessTypeURL + 'listtype');
  }

  public createType(businessType: BusinessType): Observable<any> {
    return this.httpClient.post<any>(this.businessTypeURL + 'createtype', businessType);
  }
}
