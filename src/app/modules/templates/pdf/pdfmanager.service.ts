import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfmanagerService {

  baseURL: string = "http://localhost:8080/api/template";

  constructor(private httpClient: HttpClient) { }

  createPdfTemplate(contractId: number) {
    return this.httpClient.get<any>(`${this.baseURL}/pdfcontract/${contractId}`, {responseType: 'arraybuffer' as 'json'});
  }

}
