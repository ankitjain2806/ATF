import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get(url, options): Observable<any> {
    return this.http.get(url, options);
  }

  post(url, options) {
    return this.http.post(url, options);
  }
}
