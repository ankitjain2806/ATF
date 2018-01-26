import { Injectable } from '@angular/core';

@Injectable()
export class UserSessionService {
  userSession;
  constructor() { }

  setSession(userSession) {
    this.userSession = userSession;
  }

  getSession() {
    return this.userSession;
  }
}
