import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import {UserSessionService} from "./user-session.service";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(public session: UserSessionService) {

  }
  canActivate() {
    return this.session.getSession() !== null;
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }
}
