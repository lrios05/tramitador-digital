export class DniCity {
    
    dniId: number;
    acronym: string;
    city: string;

    constructor (id: number, acronym: string, city: string) {
        this.dniId = id;
        this.acronym =  acronym;
        this.city = city;
    }
}