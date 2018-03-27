import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../shared/util/http.service';
import {EventRegistration} from "../../models/event-registration";


@Injectable()
export class DashboardService {
  private local_base = '/api/events/';

  constructor(private http: HttpService) {

  }

  getAllEvents(): Observable<any> {
    return this.http.get('/api/events/all');
  }

  getUserEvents(): Observable<any> {
    return this.http.get('/auth/myEvents');
  }

  registerEvent(eventSlug): Observable<any> {
    return this.http.post(this.local_base + 'event-register', eventSlug);
  }
}
