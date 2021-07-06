import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PaymentFrequency } from '../../../models/contract/payment-frequency';


@Injectable({
  providedIn: 'root'
})
export class PaymentFrequencyService {

  paymentURL = 'http://localhost:8080/api/contract/';

  constructor(private httpClient: HttpClient) { }

  public findPaymentFrequency(id: number): Observable<PaymentFrequency> {
    return this.httpClient.get<PaymentFrequency>(this.paymentURL + `findpaymentfrequency/${id}`);
  }

  public listPaymentFrequencies(): Observable<PaymentFrequency[]> {
    return this.httpClient.get<PaymentFrequency[]>(this.paymentURL + 'listpaymentfrequencies');
  }

  public createPaymentFrequency(paymentFrequency: PaymentFrequency): Observable<any> {
    return this.httpClient.post<any>(this.paymentURL + 'createpaymentfrequency', paymentFrequency);
  }

}
