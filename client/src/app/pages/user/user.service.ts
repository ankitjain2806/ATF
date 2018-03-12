import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../shared/util/http.service';

@Injectable()
export class UserService {

  constructor(private http: HttpService) {

  }
  getMyProfile(): Observable<any> {
    const url = '/api/users/getMyProfile';
    return this.http.get(url, {});
  }
}
