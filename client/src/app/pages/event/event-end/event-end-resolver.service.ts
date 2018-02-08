import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {EventService} from "../event.service";

import 'rxjs/add/operator/map';

@Injectable()
export class EventEndDetailsResolverService implements Resolve<any> {

  constructor(private service: EventService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.params['slug'];
    return this.service.getEventEndDetail(slug);
  }
}
