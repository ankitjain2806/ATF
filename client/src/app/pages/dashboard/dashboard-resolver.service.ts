import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';

import {HttpService} from '../../shared/util/http.service';
import {DashboardService} from "./dashboard.service";

import 'rxjs/add/operator/map';

@Injectable()
export class DashboardResolverService implements Resolve<string[]>{

  constructor(private service: DashboardService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getUserEvents();
  }
}
