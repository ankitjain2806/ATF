import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';

import {HttpService} from "app/shared/util/http.service";
import {TechTalkService} from "../tech-talk.service";;

import 'rxjs/add/operator/map';

@Injectable()
export class TechTalkTopicsResolverService implements Resolve<any>{

  constructor(private service: TechTalkService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable <string[]> {
    return this.service.getAllTopics();
  }
}
