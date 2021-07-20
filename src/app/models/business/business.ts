export class Business {

    nit: string;
    public name: string;
    mobile: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    typeId?: number;
    activityId?: number;

    constructor(nit: string, name: string, mobile: string, phone: string,
                email: string, website: string, address: string, typeId: number, activityId: number){
        this.nit = nit;
        this.name = name;
        this.mobile = mobile;
        this.phone = phone;
        this.email = email;
        this.website = website;
        this.address = address;
        this.typeId = typeId;
        this.activityId = activityId;
    }

}
