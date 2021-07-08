export class ServiceType {

    serviceTypeId: number;
    serviceType: string;
    description: string;

    constructor(serviceTypeId: number, serviceType: string, description: string) {
        this.serviceTypeId = serviceTypeId;
        this.serviceType = serviceType;
        this.description = description;
    }
}
