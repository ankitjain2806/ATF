import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) {

  }

  googleLoginApi(): Observable<any> {
    return this.http.get('/api/users/googleLogin', {})
      .map((res : Response) => {
        return res;
      })
  }
}
