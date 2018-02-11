import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';

import {HttpService} from '../../../../shared/util/http.service';
import {EventRegistration} from "../../../../models/event-registration";
import {IEvent} from "../../../../models/event";
import {EventService} from "../../event.service";

import 'rxjs/add/operator/map';

@Injectable()
export class EventDetailsResolverService implements Resolve<IEvent>{

  constructor(private service: EventService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable <any> {
    return this.service.getResources('compiler');
  }
}
