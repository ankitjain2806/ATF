import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

@Injectable()
export class LoaderService {

  // Observable string sources
  private showLoaderMethod = new Subject<any>();
  private hideLoaderMethod = new Subject<any>();

  // Observable string streams
  showLoader$ = this.showLoaderMethod.asObservable();
  hideLoader$ = this.hideLoaderMethod.asObservable();
  // Service message commands
  showLoader() {
    this.showLoaderMethod.next();
  }

  hideLoader() {
    this.hideLoaderMethod.next();
  }
}
