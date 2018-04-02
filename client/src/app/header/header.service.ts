import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from 'app/shared/util/http.service';

@Injectable()
export class HeaderService {

  constructor(
    private httpService: HttpService
  ) { }

  getUserSession() {
    return this.httpService.get('/api/auth/getCurrentSession');
  }
}
