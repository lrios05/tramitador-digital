import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable } from 'rxjs';

import { ActivityGroup } from '../../../models/business/activity-group';

@Injectable({
  providedIn: 'root'
})
export class ActivityGroupService {

  groupURL = 'http://localhost:8080/api/business/';

  constructor(private httpClient: HttpClient) { }

  public findGroup(id: number): Observable<ActivityGroup> {
    return this.httpClient.get<ActivityGroup>(this.groupURL + `findgroup/${id}`);
  }

  public listGroup(): Observable<ActivityGroup[]> {
    return this.httpClient.get<ActivityGroup[]>(this.groupURL + 'listgroup');
  }

  public createGroup(activityGroup: ActivityGroup): Observable<any> {
    return this.httpClient.post<any>(this.groupURL + 'creategroup', activityGroup);
  }

}
