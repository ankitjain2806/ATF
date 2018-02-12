import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../shared/util/http.service';
import {IEvent} from "../../models/event";

@Injectable()
export class SuperAdminService {

  constructor(private http: HttpService) {
  }

  getAllEvents(): Observable<any> {
    return this.http.get('/api/events/all', {});
  }

  addEvent(event: IEvent): Observable<any> {
    return this.http.post('/api/superadmin/events/addNewEvent', event);
  }

  updateEvent(event :IEvent): Observable<any>{
    return this.http.put("/api/superadmin/events/updateEvent/"+event._id, event);
  }

  deleteEvent(event :IEvent): Observable<any>{
    return this.http.delete("/api/superadmin/events/deleteEvent/"+event._id, {});
  }
}
