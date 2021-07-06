import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Activity } from '../../../models/business/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activitypURL = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  public findType(id: number): Observable<Activity> {
    return this.httpClient.get<Activity>(this.activitypURL + `business/findactivity/${id}`);
  }

  public listTypes(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.activitypURL + 'business/listactivity');
  }

  public createType(activity: Activity): Observable<any> {
    return this.httpClient.post<any>(this.activitypURL + 'business/createactivity', activity);
  }

}
