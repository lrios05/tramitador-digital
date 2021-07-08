export class PaymentType {
    
    payTypeId: number;
    payType: string;

    constructor(payTypeId: number, payType: string) {
        this.payTypeId = payTypeId;
        this.payType = payType;
    }
}
