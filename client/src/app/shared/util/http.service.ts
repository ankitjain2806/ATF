import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get(url, options): Observable<any> {
    return this.http.get(url, options);
  }

  post(url, options) {
    return this.http.post(url, options, httpOptions);
  }

  put(url, options){
    return this.http.put(url, options);
  }

  delete(url, options){
    return this.http.delete(url, options);
  }
}
