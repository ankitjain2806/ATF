import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../shared/util/http.service';


@Injectable()
export class EventService {

  constructor(private http: HttpService) {

  }

  registerEvent(): Observable<any> {
    return this.http.post('/api/events/team-register', {});
  }

  getAllEvents(): Observable<any> {
    return this.http.get('/api/events/all', {});
  }
}
