export class BusinessType {

    typeId: number;
    businessType: string;
    description?: string;

    constructor(typeId: number, businessType: string, description: string) {
        this.typeId = typeId;
        this.businessType = businessType;
        this.description = description;
    }
}
