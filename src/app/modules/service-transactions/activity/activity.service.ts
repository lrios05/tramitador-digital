import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Activity } from '../../../models/business/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activitypURL = 'http://localhost:8080/api/business/';

  constructor(private httpClient: HttpClient) { }

  public findActivity(id: number): Observable<Activity> {
    return this.httpClient.get<Activity>(this.activitypURL + `findactivity/${id}`);
  }

  public listActivities(id: number): Observable<Activity> {
    return this.httpClient.get<Activity>(this.activitypURL + `listactivity/${id}`);
  }

  public listAllActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.activitypURL + 'listactivities');
  }

  public createActivity(activity: Activity): Observable<any> {
    return this.httpClient.post<any>(this.activitypURL + 'createactivity', activity);
  }

}
