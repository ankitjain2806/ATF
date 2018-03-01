import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../../shared/util/http.service';
import {CompilerForm} from "../../../models/compiler-form";

@Injectable()
export class CompilerService {

  private local_base = '/api/compiler';

  constructor(private http: HttpService) {

  }

  runCompilerCode(form: CompilerForm, resourceId: string) {
    form['resourceId'] = resourceId;
    const url = this.local_base + '/run';
    return this.http.post(url, form);
  }

  getResources(): Observable<any> {
    const url = this.local_base + '/resources';
    return this.http.get(url, {});
  }

  getResourceById(resourceId: string): Observable<any> {
    const url = this.local_base + '/getResource/'+resourceId;
    return this.http.get(url, {});
  }

  saveDraft(form: CompilerForm, resourceId: string) {
    form['resourceId'] = resourceId;
    const url = this.local_base + '/saveDraft';
    return this.http.post(url, form);
  }
}
