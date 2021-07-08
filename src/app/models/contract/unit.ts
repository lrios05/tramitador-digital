export class Unit {

    unitId: number;
    unit: string;
    description: string;

    constructor(unitId: number, unit: string, description: string) {
        this.unitId = unitId;
        this.unit = unit;
        this.description = description;
    }
}
