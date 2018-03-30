import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LoaderService} from "./loader.service";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class HttpService {

  constructor(private http: HttpClient,  public loader: LoaderService) {
  }

  get(url): Observable<any> {
    this.loader.showLoader();
    return this.http.get(url).map((data) => {
      this.loader.hideLoader();
      return data;
    }, (err) => {
      this.loader.hideLoader();
      this.errorHandler(err);
    }).catch((err) => {
        this.loader.hideLoader();
        return Observable.of(null);
    });
  }

  post(url, options) {
    this.loader.showLoader();
    return this.http.post(url, options).map((data) => {
      this.loader.hideLoader();
      return data;
    }, (err) => {
      this.loader.hideLoader();
      this.errorHandler(err);
    }).catch((err) => {
      console.log(err)
      this.loader.hideLoader();
      return Observable.of(null);
    });;
  }

  put(url, options){
    this.loader.showLoader();
    return this.http.put(url, options).map((data) => {
      this.loader.hideLoader();
      return data;
    }, (err) => {
      this.loader.hideLoader();
      this.errorHandler(err);
    }).catch((err) => {
      console.log(err)
      this.loader.hideLoader();
      return Observable.of(null);
    });
  }

  delete(url, options){
    return this.http.delete(url, options).map((data) => {
      this.loader.hideLoader();
      return data;
    }, (err) => {
      this.loader.hideLoader();
      this.errorHandler(err);
    }).catch((err) => {
      console.log(err)
      this.loader.hideLoader();
      return Observable.of(null);
    });
  }

  errorHandler(err) {
    console.log(err)
  }
}
