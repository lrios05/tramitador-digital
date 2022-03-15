export class Contract {

    private initDate: Date;
    private endDate: Date;
    private serviceId?: number;
    private totalCost: number;
    private payTypeId: number;
    private paymentId?: number;
    private payments: number;
    private amount: number;
    private gatherId: number;
    private wasteId: number;
    private volume: number;
    private unitId: number;
    private days: string;
  
    constructor(initDate: Date,
                endDate: Date,
                serviceId: number,
                totalCost: number,
                payTypeId: number,
                paymentId: number,
                payments: number,
                amount: number,
                gatherId: number,
                wasteId: number,
                volume: number,
                unitId: number,
                days: string,
    ) {
    
        this.initDate = initDate;
        this.endDate = endDate;
        this.serviceId = serviceId;
        this.totalCost = totalCost;
        this.payTypeId = payTypeId;
        this.paymentId = paymentId;
        this.payments = payments;
        this.amount = amount;
        this.gatherId = gatherId;
        this.wasteId =  wasteId;
        this.volume = volume;
        this.unitId = unitId;
        this.days = days;
    }


}
