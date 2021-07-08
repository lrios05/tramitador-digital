import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ServiceOffer } from '../../../models/service-offer/service-offer';

@Injectable({
  providedIn: 'root'
})
export class ServiceOfferService {

  serviceURL = 'http://localhost:8080/api/service/';

  constructor(private httpClient: HttpClient) { }

  public findService(id: number): Observable<ServiceOffer> {
    return this.httpClient.get<ServiceOffer>(this.serviceURL + `find/${id}`);
  }

  public listServices(id: number): Observable<ServiceOffer> {
    return this.httpClient.get<ServiceOffer>(this.serviceURL + `list/${id}`);
  }

  public listAllServices(): Observable<ServiceOffer[]> {
    return this.httpClient.get<ServiceOffer[]>(this.serviceURL + 'listall');
  }

  public createService(serviceOffer: ServiceOffer): Observable<any> {
    return this.httpClient.post<any>(this.serviceURL + 'create', serviceOffer);
  }

}
