import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignatureInfo } from '../../models/signature/signature-info';

@Injectable({
  providedIn: 'root'
})
export class ApisignatureService {

  apisignURL = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  public findSignature(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apisignURL}signature/find/${id}`);
  }

  public findSignatureByContract(contractId: number): Observable<any> {
    return this.httpClient.get(`${this.apisignURL}signature/findbycontract/${contractId}`);
  }

  public createSignature(signatureInfo: SignatureInfo): Observable<any> {
    return this.httpClient.post<SignatureInfo>(`${this.apisignURL}signature/create/`, signatureInfo);
  }

  // To manage up down files
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.apisignURL}signature/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.apisignURL}signature/files`);
  }

}
