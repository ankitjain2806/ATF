import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild} from '@angular/router';
import {UserSessionService} from "./user-session.service";
import {Observable} from "rxjs/Observable";
import {LoaderService} from "./loader.service";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(public session: UserSessionService, public loader: LoaderService) {

  }

  canActivate() : Observable<boolean> {
    this.loader.showLoader();
    return this.session.checkSession().map((data)=> {
      this.loader.hideLoader();
      return data.session;
    });
    //return this.session.getSession() !== null;
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }
}
