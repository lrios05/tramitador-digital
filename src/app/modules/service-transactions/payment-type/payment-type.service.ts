import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PaymentType } from '../../../models/contract/payment-type';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  typeURL = 'http://localhost:8080/api/contract/';

  constructor(private httpClient: HttpClient) { }

  public findType(id: number): Observable<PaymentType> {
    return this.httpClient.get<PaymentType>(this.typeURL + `findtype/${id}`);
  }

  public listTypes(): Observable<PaymentType[]> {
    return this.httpClient.get<PaymentType[]>(this.typeURL + 'listtype');
  }

  public createType(paymentType: PaymentType): Observable<any> {
    return this.httpClient.post<any>(this.typeURL + 'createtype', paymentType);
  }

}
