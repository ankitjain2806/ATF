import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {HttpService} from 'app/shared/util/http.service';
import {UserService} from "../user.service";

import 'rxjs/add/operator/map';

@Injectable()
export class UserResolverService implements Resolve<any>{

  constructor(private service: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable <any> {
    return this.service.getMyProfile();
  }
}
