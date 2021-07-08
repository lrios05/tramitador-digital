export class WasteType {

    wasteId: number;
    waste: string;
    description: string;

    constructor(wasteId: number, waste: string, description: string) {
        this.wasteId = wasteId;
        this.waste = waste;
        this.description = description;
    }
}
