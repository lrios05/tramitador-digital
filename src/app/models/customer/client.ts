export class Client {
    id?: number;
    dni: string;
    originDni?: string;
    name: string;
    paternal: string;
    maternal: string;
    mobile: string;
    phone: string;
    email: string;
    address: string;

    constructor(dni: string, originDni: string, name: string,
                paternal: string, maternal: string, 
                mobile: string, phone:string,
                email: string, address: string){

        this.dni = dni;
        this.originDni = originDni;
        this.name = name;
        this.paternal = paternal;
        this.maternal = maternal;
        this.mobile = mobile;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }
}
