import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../../shared/util/http.service';
import {CompilerForm} from "../../../models/compiler-form";

@Injectable()
export class TechTalkService {

  private local_base = '/api/compiler';

  constructor(private http: HttpService) {

  }
}
