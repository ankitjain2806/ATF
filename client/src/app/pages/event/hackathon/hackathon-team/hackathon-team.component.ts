import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../event.service";

@Component({
  selector: 'hck-team',
  templateUrl : 'hackathon-team.component.html'
})
export class HackathonTeamComponent implements OnInit {
  teams = null;
  teamDetail = null;
  constructor(private route: ActivatedRoute,
              private eventService: EventService) {
    this.route.data.subscribe((res) => {
      this.teams = res.teams.data.hackathon;
    });
  }
  ngOnInit() {

  }

  teamInfoIndex(i) {
    this.teamDetail = this.teams[i].teamId;
  }
}
