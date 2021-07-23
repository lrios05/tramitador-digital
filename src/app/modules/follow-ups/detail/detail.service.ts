import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Detail } from '../../../models/follow-ups/detail';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  detailURL = 'http://localhost:8080/api/followup/';

  constructor(private httpClient: HttpClient) { }

  public findDetail(id: number): Observable<Detail> {
    return this.httpClient.get<Detail>(`${this.detailURL}finddetail/${id}`);
  }

  public findDetailByNote(id: number): Observable<Detail> {
    return this.httpClient.get<Detail>(`${this.detailURL}findnote/${id}`);
  }

  public listDetails(): Observable<Detail[]> {
    return this.httpClient.get<Detail[]>(`${this.detailURL}listdetails`);
  }

  public createDetail(noteId: string, detail: Detail): Observable<any> {
    console.log(detail);
    return this.httpClient.post<any>(`${this.detailURL}createdetail/${noteId}`, detail);
  }

}
