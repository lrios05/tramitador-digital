import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DniCity } from '../../../models/customer/dni-city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  cityURL = 'http://localhost:8080/api/dnicity/';

  constructor(private httpClient: HttpClient) { }

  public findDniCity(id: number): Observable<DniCity> {
    return this.httpClient.get<DniCity>(this.cityURL + `findcity/${id}`);
  }

  public listCities(): Observable<DniCity[]> {
    return this.httpClient.get<DniCity[]>(this.cityURL + 'listcities');
  }

  public createDniCity(dniCity: DniCity): Observable<any> {
    return this.httpClient.post<any>(this.cityURL + 'addcity', dniCity);
  }

}
