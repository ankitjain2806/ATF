import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../../shared/util/http.service';
import {CompilerForm} from "../../../models/compiler-form";

@Injectable()
export class TechTalkService {

  private local_base = '/api/techtalks';

  constructor(private http: HttpService) {

  }

  getAllTopics() {
    return this.http.get(this.local_base + '/getAllTopics', {})
  }

  subscribeTopic(data) {
    return this.http.put(this.local_base + '/subscribe', data);
  }
}
