import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Unit } from '../../../models/contract/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  unitURL = 'http://localhost:8080/api/contract/';

  constructor(private httpClient: HttpClient) { }

  public findUnit(id: number): Observable<Unit> {
    return this.httpClient.get<Unit>(this.unitURL + `findunit/${id}`);
  }

  public listUnits(): Observable<Unit[]> {
    return this.httpClient.get<Unit[]>(this.unitURL + 'listunits');
  }

  public createUnit(unit: Unit): Observable<any> {
    return this.httpClient.post<any>(this.unitURL + 'createunit', unit);
  }

}
