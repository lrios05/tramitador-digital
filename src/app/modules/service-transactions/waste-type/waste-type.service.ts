import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { WasteType } from '../../../models/contract/waste-type';

@Injectable({
  providedIn: 'root'
})
export class WasteTypeService {

  wasteType = 'http://localhost:8080/api/contract/';

  constructor(private httpClient: HttpClient) { }

  public findWaste(id: number): Observable<WasteType> {
    return this.httpClient.get<WasteType>(this.wasteType + `findwaste/${id}`);
  }

  public listWaste(): Observable<WasteType[]> {
    return this.httpClient.get<WasteType[]>(this.wasteType + 'listwaste');
  }

  public createWaste(wasteType: WasteType): Observable<any> {
    return this.httpClient.post<any>(this.wasteType + 'createwaste', wasteType);
  }

}
