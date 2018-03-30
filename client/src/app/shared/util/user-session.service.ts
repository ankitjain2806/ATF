import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

@Injectable()
export class UserSessionService {
  userSession;
  constructor(public http: HttpService) { }

/*  setSession(userSession) {
    this.userSession = userSession;
  }*/

  getSession() {
    return JSON.parse(localStorage.getItem('userSession'));
    // return this.userSession;
  }

  checkSession() {
    return this.http.get('/api/auth/checkSession');
  }
}
