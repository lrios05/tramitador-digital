import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ServiceOffer } from '../../../models/service-offer/service-offer';

@Injectable({
  providedIn: 'root'
})
export class ServiceOfferService {

  serviceURL = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  public findService(id: number): Observable<ServiceOffer> {
    return this.httpClient.get<ServiceOffer>(this.serviceURL + `service/find/${id}`);
  }

  public listServices(): Observable<ServiceOffer[]> {
    return this.httpClient.get<ServiceOffer[]>(this.serviceURL + 'service/list');
  }

  public createService(serviceOffer: ServiceOffer): Observable<any> {
    return this.httpClient.post<any>(this.serviceURL + 'service/create', serviceOffer);
  }

}
