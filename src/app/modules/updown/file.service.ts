import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadDetail } from 'src/app/models/uploads/upload-detail';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private uploadURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.uploadURL}/file/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.uploadURL}/file/download/${filename}/`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  public findByContractCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.uploadURL}/file/findbycontract/${code}`);
  }

  public createAttacheDocuments(uploadDetail: UploadDetail): Observable<any> {
    return this.http.post<any>(`${this.uploadURL}/file/create`, uploadDetail);
  }
}
