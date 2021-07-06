import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ServiceType } from '../../../models/service-offer/service-type';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  typeURL = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  public findType(id: number): Observable<ServiceType> {
    return this.httpClient.get<ServiceType>(this.typeURL + `service/findtype/${id}`);
  }

  public listTypes(): Observable<ServiceType[]> {
    return this.httpClient.get<ServiceType[]>(this.typeURL + 'service/listtype');
  }

  public createType(ServiceType: ServiceType): Observable<any> {
    return this.httpClient.post<any>(this.typeURL + 'service/createtype', ServiceType);
  }
}
