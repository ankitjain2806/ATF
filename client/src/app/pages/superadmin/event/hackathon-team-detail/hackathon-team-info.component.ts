import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SuperAdminService} from "../../superadmin.service";

@Component({
  selector: 'hck-team-info',
  templateUrl : 'hackathon-team-info.component.html'
})
export class HackathonTeamInfoComponet implements OnInit {
  teamInfo :any;
  constructor(private route: ActivatedRoute, private eventService: SuperAdminService) {

  }
  ngOnInit() {
    this.eventService.getTeamInfoById(this.route.snapshot.paramMap.get('teamId')).subscribe(data=>{
      console.log(data);
      this.teamInfo = data;
    });

  }
}
