export class ServiceOffer {

    serviceId: number;
    service: string;
    description: string;
    serviceTypeId?: number;

    constructor(serviceId: number, service: string, description: string, serviceTypeId: number) {
        this.serviceId = serviceId;
        this.service = service;
        this.description = description;
        this.serviceTypeId = serviceTypeId
    }
}
