export class ServiceOffer {

    serviceId: number;
    service: string;
    description: string;
    price: number;
    serviceTypeId?: number;

    constructor(serviceId: number, service: string, description: string, price: number, serviceTypeId: number) {
        this.serviceId = serviceId;
        this.service = service;
        this.description = description;
        this.price = price;
        this.serviceTypeId = serviceTypeId
    }
}
