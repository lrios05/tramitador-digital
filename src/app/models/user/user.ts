export class User {
 
    email: string | undefined;
    password: string | undefined;
    name: string | undefined;
    paternal: string | undefined;
    maternal: string | undefined;
    //authorities: string[] = [];

    constructor(email: string, password: string, name: string, paternal: string, maternal: string){
        this.email = email;
        this.password = password;
        this.name = name;
        this.paternal = paternal;
        this.maternal = maternal;
    }

 }
