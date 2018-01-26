import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../shared/util/http.service';


@Injectable()
export class HomeService {

  constructor(private http: HttpService) {

  }

  googleLoginApi(): Observable<any> {
    return this.http.get('/api/users/auth/google', {});
  }
}
