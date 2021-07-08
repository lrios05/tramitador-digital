export class PaymentFrequency {

    paymentId: number;
    frequency: string;

    constructor(paymentId: number, frequency: string) {
        this.paymentId = paymentId;
        this.frequency = frequency;
    }
}
