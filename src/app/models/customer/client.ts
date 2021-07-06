export class Client {
    id?: number;
    dni: string | undefined;
    originDni?: string;
    name: string | undefined;
    paternal: string | undefined;
    maternal: string | undefined;
    mobile: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    address: string | undefined;

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
