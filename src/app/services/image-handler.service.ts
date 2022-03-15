import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageHandlerService {

  private imageURL = 'http://localhost:8080/api/images/';

  constructor(private httpClient: HttpClient) { }

  public getImageByContract(httpParams: HttpParams): Observable<any> {
    return this.httpClient.get(`${this.imageURL}find/`, {params: httpParams, responseType: 'text'})
  }

  public getImageByName(imagename: string): Observable<any> {
    return this.httpClient.get(this.imageURL + `${imagename}`, { responseType: 'text'});
  }
}
