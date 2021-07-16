import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

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

}
