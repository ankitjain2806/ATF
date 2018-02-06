import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../shared/util/http.service';

import {EventRegistration} from "../../models/event-registration";
import {CompilerForm} from "../../models/compiler-form";

@Injectable()
export class EventService {

  constructor(private http: HttpService) {

  }

  registerEvent(form: EventRegistration): Observable<any> {
    const url = '/api/events/team-register';
    return this.http.post(url, form);
  }

  getAllEvents(): Observable<any> {
    const url = '/api/events/all';
    return this.http.get('/api/events/all', {});
  }

  getEventDetail(slug: string) : Observable<any> {
    const url = '/api/events/getEventDetails/' + slug
    return this.http.get(url, {});
  }

  runCompilerCode(form: CompilerForm) {
    const url = '/api/events/compiler/run';
    return this.http.post(url, form);
  }
}
