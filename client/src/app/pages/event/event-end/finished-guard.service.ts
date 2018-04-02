import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {EventService} from "../event.service";
import {UserSessionService} from "app/shared/util/user-session.service";

@Injectable()
export class FinishedGuardService implements CanActivate {

  private route;
  private state;

  constructor(
    private eventService: EventService,
    private userSession: UserSessionService) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.route = route;
    this.state = state;
    return this.checkIfUserActuallyFinished().map(e => {
      return e['data'];
    });
  }

  private checkIfUserActuallyFinished(): Observable<boolean> {
    return this.eventService.isEventEnded(this.route.params['slug'], this.userSession.getSession()._id);
  }
}
