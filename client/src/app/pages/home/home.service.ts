import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../shared/util/http.service';


@Injectable()
export class HomeService {

  constructor(private http: HttpService) {

  }

  googleLoginApi(): Observable<any> {
    return this.http.get('/api/users/googleLogin', {}).map((res : Observable<Response>) => {
        return res;
    })
  }
}
