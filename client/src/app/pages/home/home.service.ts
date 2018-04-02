import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from 'app/shared/util/http.service';


@Injectable()
export class HomeService {

  constructor(private http: HttpService) {

  }
}
