import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../shared/util/http.service';

import {EventRegistration} from "../../models/event-registration";
import {CompilerForm} from "../../models/compiler-form";

@Injectable()
export class EventService {

  private local_base = '/api/events/';

  constructor(private http: HttpService) {

  }

  registerEvent(form: EventRegistration): Observable<any> {
    return this.http.post(this.local_base + 'team-register', form);
  }

  getAllEvents(): Observable<any> {
    return this.http.get(this.local_base + 'all', {});
  }

  getEventDetail(slug: string): Observable<any> {
    const url = this.local_base + 'getEventDetails/' + slug
    return this.http.get(url, {});
  }

  runCompilerCode(form: CompilerForm) {
    const url = '/api/events/compiler/run';
    return this.http.post(url, form);
  }

  getEventEndDetail(slug: string): Observable<any> {
    const url = this.local_base + 'end';
    const params = {slug};
    return this.http.post(url, params);
  }

  isEventEnded(slug: string, user: string): Observable<any> {
    const params = {slug, user};
    const url = this.local_base + '/isended';
    return this.http.post(url, params);
  }
}
