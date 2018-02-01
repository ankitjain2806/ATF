import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../shared/util/http.service';


@Injectable()
export class DashboardService {

  constructor(private http: HttpService) {

  }

  getAllEvents(): Observable<any> {
    return this.http.get('http://localhost:3000/api/events/all', {});
  }
}
