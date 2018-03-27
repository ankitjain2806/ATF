import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {HttpService} from '../../shared/util/http.service';

import {EventRegistration} from "../../models/event-registration";
import {CompilerForm} from "../../models/compiler-form";
import {HackathonRegistration} from "../../models/hackathon-registration";

@Injectable()
export class EventService {

  private local_base = '/api/events/';

  constructor(private http: HttpService) {

  }

  registerEvent(form: EventRegistration): Observable<any> {
    return this.http.post(this.local_base + 'team-register', form);
  }

  getAllEvents(): Observable<any> {
    return this.http.get(this.local_base + 'all');
  }

  getEventDetail(slug: string): Observable<any> {
    const url = this.local_base + 'getEventDetails/' + slug
    return this.http.get(url);
  }

  runCompilerCode(form: CompilerForm, resourceId: string, Resource: string) {
    form['resourceId'] = resourceId;
    form['Resource'] = Resource;
    const url = '/api/compiler/run';
    return this.http.post(url, form);
  }

  getEventEndDetail(slug: string): Observable<any> {
    const url = this.local_base + 'end';
    const params = {slug};
    return this.http.post(url, params);
  }

  isEventEnded(slug: string, user: string): Observable<any> {
    const params = {slug, user};
    const url = this.local_base + 'isended';
    return this.http.post(url, params);
  }

  getResources(slug: string): Observable<any> {
    const url = this.local_base + 'resources/'+slug;
    return this.http.get(url);
  }

  getResourceById(resourceId: string): Observable<any> {
    const url = this.local_base + 'getResource/'+resourceId;
    return this.http.get(url);
  }

  getTeamInfoById(teamId: string):Observable<any>{
    return this.http.get("/api/superadmin/teams/HCK/showdetails/"+teamId);
  }

  getHCKteamInfo() : Observable <any> {
    return this.http.get("/api/HCK/getTeamDetail");
  }
  completeHackathonRegistration(resources: HackathonRegistration){
    console.log(resources);
    return this.http.post("/api/HCK/saveRegistration", resources);
  }
  getHackathonRegistration() {
    return this.http.get("/api/HCK/getRegistration");
  }
  getMyHackathonTeams() {
    return this.http.get("/api/HCK/getMyTeams");
  }

  checkTeamName(teamName : string){
    return this.http.get("/api/HCK/checkTeamName/"+teamName)
  }
}
