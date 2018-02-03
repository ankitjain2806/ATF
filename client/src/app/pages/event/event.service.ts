import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../shared/util/http.service';

import {EventRegistration} from "../../models/event-registration";

@Injectable()
export class EventService {

  constructor(private http: HttpService) {

  }

  registerEvent(form: EventRegistration): Observable<any> {
    return this.http.post('/api/events/team-register', form);
  }

  getAllEvents(): Observable<any> {
    return this.http.get('/api/events/all', {});
  }

  getEventDetail(slug: string) : Observable<any> {
    const url = '/api/events/getEventDetails/' + slug
    return this.http.get(url, {});
  }
}
