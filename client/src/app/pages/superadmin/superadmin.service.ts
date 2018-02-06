import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../shared/util/http.service';
import {AddEvent} from "../../models/AddEvent";

@Injectable()
export class SuperAdminService {

  constructor(private http: HttpService) {
  }

  getAllEvents(): Observable<any> {
    return this.http.get('http://localhost:3000/api/events/all', {});
  }

  addEvent(event: AddEvent): Observable<any> {
    return this.http.post('http://localhost:3000/api/superadmin/events/add-new-event', event);
  }

  updateEvent(event :AddEvent): Observable<any>{
    return this.http.put("http://localhost:3000/api/superadmin/events/update-event/"+event._id, event);
  }

  deleteEvent(event :AddEvent): Observable<any>{
    return this.http.delete("http://localhost:3000/api/superadmin/events/delete-event/"+event._id, event);
  }
}