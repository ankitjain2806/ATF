import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild} from '@angular/router';
import {UserSessionService} from "./user-session.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(public session: UserSessionService) {

  }

  canActivate() : Observable<boolean> {
    return this.session.checkSession().map((data)=> {
      return data.session;
    });
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }
}
