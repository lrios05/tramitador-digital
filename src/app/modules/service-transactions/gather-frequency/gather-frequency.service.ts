import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GatherFrequency } from '../../../models/contract/gather-frequency';

@Injectable({
  providedIn: 'root'
})
export class GatherFrequencyService {

  gatherURL = 'http://localhost:8080/api/contract/';

  constructor(private httpClient: HttpClient) { }

  public findGatherFrequency(id: number): Observable<GatherFrequency> {
    return this.httpClient.get<GatherFrequency>(this.gatherURL + `findgatherfrequency/${id}`);
  }

  public listGatherFrequencies(): Observable<GatherFrequency[]> {
    return this.httpClient.get<GatherFrequency[]>(this.gatherURL + 'listgatherfrequencies');
  }

  public createGatherFrequency(gatherFrequency: GatherFrequency): Observable<any> {
    return this.httpClient.post<any>(this.gatherURL + 'creategatherfrequency', gatherFrequency);
  }
}
