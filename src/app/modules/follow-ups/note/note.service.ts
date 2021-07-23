import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NoteDetail } from '../../../models/follow-ups/note-detail';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  noteURL = 'http://localhost:8080/api/followup/';

  constructor(private httpClient: HttpClient) { }

  public findNote(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.noteURL}find/${id}`);
  }

  public findByNoteId(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.noteURL}findbynote/${id}`);
  }

  public findByContractId(id: number): Observable<NoteDetail> {
    return this.httpClient.get<NoteDetail>(`${this.noteURL}findbycontractid/${id}`);
  }

  public findByContractCode(code: string): Observable<NoteDetail> {
    return this.httpClient.get<NoteDetail>(`${this.noteURL}findbycontract/${code}`);
  }

  public findNoteByNumber(numCode: number): Observable<NoteDetail> {
    return this.httpClient.get<NoteDetail>(`${this.noteURL}findbynumber/${numCode}`);
  }

  public findNoteByStatus(status: string): Observable<NoteDetail> {
    return this.httpClient.get<NoteDetail>(`${this.noteURL}findbystatus/${status}`);
  }

  public findNoteByParams(httpParams: HttpParams): Observable<any> {
    return this.httpClient.get<any>(`${this.noteURL}findbyparams/`,{params: httpParams});
  }

  public listNotes(): Observable<NoteDetail[]> {
    return this.httpClient.get<NoteDetail[]>(`${this.noteURL}list`);
  }

  public createNote(contractId: string, note: NoteDetail): Observable<any> {
    return this.httpClient.post<any>(`${this.noteURL}create/${contractId}`, note);
  }
}
