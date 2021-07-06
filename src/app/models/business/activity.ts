export class Activity {
    
    activityId: number;
    activity: string;
    activityGroup?: string[];

    constructor(activityId: number, activity: string) {
        this.activityId = activityId;
        this.activity =  activity;
    }
}
