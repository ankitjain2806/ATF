import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import {DashboardService} from "./dashboard.service";
import {EventRegistration} from "../../models/event-registration";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userEvent = [];

  constructor(private dashboardService: DashboardService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe((res) => {
      this.userEvent = res.events.data;
    });
  }

  ngOnInit() {
    /* this.dashboardService.getAllEvents().subscribe(data => {
       console.log(data);
       this.events = data;
     });*/
  }

  eventRegistration(eventSlug: string) {
    switch (eventSlug) {
      case 'compiler':
        let compilerObj: EventRegistration = {
          teamName: '',
          members: [],
          slug: 'compiler'
        }
        this.dashboardService.registerEvent(compilerObj).subscribe(() => {
          this.router.navigate(['/compiler/intro']);
        })
        break;
      case 'treasurehunt':
        let thObj: EventRegistration = {
          teamName: '',
          members: [],
          slug: 'treasurehunt'
        }
        this.dashboardService.registerEvent(thObj).subscribe(() => {
          this.router.navigate(['/treasurehunt/game']);
        })
        break;
      case 'hackathon':
        let hckObj: EventRegistration = {
          teamName: '',
          members: [],
          slug: 'hackathon'
        }
        this.dashboardService.registerEvent(hckObj).subscribe(() => {
          this.router.navigate(['/hackathon/registration']);
        })
        break;
    }
  }

  eventContinue(eventSlug: string) {
    switch (eventSlug) {
      case 'compiler':
        this.router.navigate(['/compiler/intro']);
        break;
      case 'treasurehunt':
        this.router.navigate(['/treasurehunt/game']);
        break;
      case 'hackathon':
        this.router.navigate(['/hackathon/registration']);
        break;
    }
  }
}
